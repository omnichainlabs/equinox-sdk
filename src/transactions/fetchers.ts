import { normalize } from 'path'

import { SCAN_MAP } from '../constants.js'
import {
  Address,
  Network,
  ScanTransaction,
  Transaction
} from '../types.js'
import {
  normalizeAddress,
  sleep
} from '../utils/index.js'

const NUM_SCAN_PAGES = 10
const RATE_LIMIT_INTERVAL_MS = 300

export async function fetchBalanceByAddress (address: Address, network: Network): Promise<number> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=balance&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const data = await res.json()
  const balance: number = Number((Number(data.result) / 1000000000000000000).toFixed(2))
  return balance
}

export async function fetchTransaction ({
  projectId,
  address,
  network,
  page,
  blockNumber
}: {
  projectId: string
  address: Address
  network: Network
  page?: number
  blockNumber?: number
}): Promise<Transaction[]> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlist&address=${address}&startblock=${blockNumber ?? 0}&endblock=${blockNumber ?? 99999999}&page=${page ?? 1}&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const scanTransactions = await res.json()
  if (Array.isArray(scanTransactions.result)) {
    return scanTransactions.result.map((scanTransaction: ScanTransaction): Transaction => scanTransactionToTransaction(projectId, network, scanTransaction))
  }
  return []
}

export async function fetchTransactionNetwork (projectId: string, address: Address, network: Network): Promise<Transaction[]> {
  const transactions: Transaction[] = []
  try {
    for (let page = 1; page <= NUM_SCAN_PAGES; ++page) {
      const newTransactions = await fetchTransaction({ projectId, address, network, page })
      if (newTransactions.length === 0) {
        break
      }
      transactions.push(...newTransactions)
      await sleep(RATE_LIMIT_INTERVAL_MS)
    }
  } catch (error) {
    console.error(error)
  }
  return transactions
}

export async function fetchAllTransactions (projectId: string, address: Address): Promise<Transaction[]> {
  return (await Promise.all(
    Object.values(Network).map(async (network: Network): Promise<Transaction[]> => await fetchTransactionNetwork(projectId, address, network))
  )).flat()
}

export async function fetchTransactionFromContractAddress (projectId: string, contractAddress: Address, network: Network): Promise<Transaction> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlistinternal&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const data = await res.json()
  const {
    blockNumber,
    from: address
  } = data.result[0] as {
    blockNumber: number
    from: Address
  }
  const transactions = await fetchTransaction({ projectId, address, network, blockNumber })
  return {
    ProxyContractAddress: contractAddress,
    ...transactions[0]
  }
}

export async function fetchOneContract ({
  projectId,
  walletAddress,
  network,
  contractAddress
}: {
  projectId: string
  walletAddress: Address
  network: Network
  contractAddress: Address
}): Promise<Transaction> {
  if (contractAddress === '') {
    throw new Error('Please provide a non-empty contract address.')
  }
  const address = normalizeAddress(contractAddress)
  const transactions = await fetchTransactionNetwork(projectId, walletAddress, network)
  const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.ContractAddress === address)
  if (filteredTransactions.length === 0) {
    throw new Error(`The address ${walletAddress} has not deployed any contracts with address ${address} on ${network}!`)
  }
  return filteredTransactions[0]
}

export function scanTransactionToTransaction (ProjectId: string, Network: Network, scanTransaction: ScanTransaction): Transaction {
  return {
    BlockHash: scanTransaction.blockHash,
    BlockNumber: Number(scanTransaction.blockNumber),
    Confirmations: Number(scanTransaction.confirmations),
    ContractAddress: normalizeAddress(scanTransaction.contractAddress) ?? normalize(scanTransaction.to),
    ContractId: normalizeAddress(scanTransaction.contractAddress),
    CumulativeGasUsed: Number(scanTransaction.cumulativeGasUsed),
    FromAddress: normalizeAddress(scanTransaction.from),
    FunctionName: scanTransaction.functionName,
    Gas: Number(scanTransaction.gas),
    GasPrice: Number(scanTransaction.gasPrice),
    GasUsed: Number(scanTransaction.gasUsed),
    TransactionHash: scanTransaction.hash,
    Input: scanTransaction.input,
    IsError: scanTransaction.isError,
    MethodId: scanTransaction.methodId,
    Network,
    Nonce: Number(scanTransaction.nonce),
    ProjectId,
    Timestamp: Number(scanTransaction.timeStamp),
    TransactionIndex: Number(scanTransaction.transactionIndex),
    ToAddress: normalizeAddress(scanTransaction.to),
    TxReceiptStatus: Number(scanTransaction.txreceipt_status),
    Value: scanTransaction.value
  }
}

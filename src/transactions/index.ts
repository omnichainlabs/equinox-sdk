import { normalize } from 'path'

import { SCAN_MAP } from '../constants.js'
import {
  Address,
  Network,
  ScanTransaction,
  Transaction,
  UserProps
} from '../types.js'
import { normalizeAddress } from '../utils.js'

const NUM_SCAN_PAGES = 10
const RATE_LIMIT_INTERVAL_MS = 300

export async function getAllTransactions (ownerAddress: Address, user: UserProps, contractsOnly: boolean, transactionsOnly: boolean): Promise<Transaction[]> {
  let transactions: Transaction[] = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions/${user.email}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    transactions = await response.json()
    if (transactions.length === 0) {
      transactions = await fetchAllTransactions(ownerAddress)
      for (const transaction of transactions) {
        await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions`, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(transaction),
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': user.apikey,
            'x-user-id': user.email
          }
        })
      }
    }
  } catch (err) {
    console.error(err)
  }

  if (contractsOnly) {
    return transactions.filter((transaction: Transaction) => transaction.ContractId)
  }
  if (transactionsOnly) {
    return transactions.filter((transaction: Transaction) => transaction.ContractId === undefined)
  }
  return transactions
}

async function fetchTransactionPage (ownerAddress: Address, network: Network, page: number): Promise<Transaction[]> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlist&address=${ownerAddress}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const scanTransactions = await res.json()
  if (typeof scanTransactions?.result === typeof []) {
    return scanTransactions.result.map((scanTransaction: ScanTransaction): Transaction => scanTransactionToTransaction(network, scanTransaction))
  }
  return []
}

async function fetchTransactionNetwork (ownerAddress: Address, network: Network): Promise<Transaction[]> {
  const transactions: Transaction[] = []
  try {
    for (let page = 1; page <= NUM_SCAN_PAGES; ++page) {
      const newTransactions = await fetchTransactionPage(ownerAddress, network, page)
      transactions.push(...newTransactions)
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_INTERVAL_MS))
    }
  } catch (error) {
    console.error(error)
  }
  return transactions
}

async function fetchAllTransactions (ownerAddress: Address): Promise<Transaction[]> {
  return (await Promise.all(
    Object.values(Network).map(async (network: Network): Promise<Transaction[]> => await fetchTransactionNetwork(ownerAddress, network))
  )).flat()
}

export async function fetchOneContract (ownerAddress: Address, network: Network, contractAddress: Address): Promise<Transaction> {
  if (contractAddress === '') {
    throw new Error('Please provide a non-empty contract address.')
  }
  const transactions = await fetchTransactionNetwork(ownerAddress, network)
  const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.ContractAddress === contractAddress)
  if (filteredTransactions.length === 0) {
    throw new Error(`The address ${ownerAddress} has not deployed any contracts with address ${contractAddress} on ${network}!`)
  }
  return filteredTransactions[0]
}

function scanTransactionToTransaction (Network: Network, scanTransaction: ScanTransaction): Transaction {
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
    Hash: scanTransaction.hash,
    Input: scanTransaction.input,
    IsError: scanTransaction.isError,
    MethodId: scanTransaction.methodId,
    Network,
    Nonce: Number(scanTransaction.nonce),
    ProjectId: 'My First Project',
    Timestamp: Number(scanTransaction.timeStamp),
    TransactionIndex: Number(scanTransaction.transactionIndex),
    ToAddress: normalizeAddress(scanTransaction.to),
    TxReceiptStatus: Number(scanTransaction.txreceipt_status),
    Value: scanTransaction.value
  }
}

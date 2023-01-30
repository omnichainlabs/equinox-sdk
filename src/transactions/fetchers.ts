import {
  SCAN_MAP,
  SCAN_RATE_LIMIT_INTERVAL_MS
} from '../constants.js'
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

export async function fetchBalanceByAddress (address: Address, network: Network): Promise<number | undefined> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=balance&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const data = await res.json()
  if (data.status === '1') {
    const balance: number = Number((Number(data.result) / 1000000000000000000).toFixed(2))
    return balance
  }
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
  if (scanTransactions.status === '1' && Array.isArray(scanTransactions.result)) {
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
      await sleep(SCAN_RATE_LIMIT_INTERVAL_MS)
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

export async function fetchTransactionFromContractAddress (projectId: string, contractAddress: Address, network: Network): Promise<Transaction | undefined> {
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlistinternal&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const data = await res.json()
  if (data.status !== '1') {
    return
  }

  const {
    blockNumber,
    from: address
  } = data.result[0] as {
    blockNumber: number
    from: Address
  }
  const transactions = await fetchTransaction({ projectId, address, network, blockNumber })
  if (transactions.length === 0) {
    return
  }
  return {
    proxyContractAddress: contractAddress,
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
  const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.contractAddress === address || transaction.proxyContractAddress === address)
  if (filteredTransactions.length === 0) {
    throw new Error(`The address ${walletAddress} has not deployed any contracts with address ${address} on ${network}!`)
  }
  return filteredTransactions[0]
}

export function scanTransactionToTransaction (projectId: string, network: Network, scanTransaction: ScanTransaction): Transaction {
  return {
    blockHash: scanTransaction.blockHash,
    blockNumber: Number(scanTransaction.blockNumber),
    confirmations: Number(scanTransaction.confirmations),
    contractAddress: normalizeAddress(scanTransaction.contractAddress),
    cumulativeGasUsed: Number(scanTransaction.cumulativeGasUsed),
    fromAddress: normalizeAddress(scanTransaction.from),
    functionName: scanTransaction.functionName,
    gas: Number(scanTransaction.gas),
    gasPrice: Number(scanTransaction.gasPrice),
    gasUsed: Number(scanTransaction.gasUsed),
    input: scanTransaction.input,
    isError: scanTransaction.isError,
    methodId: scanTransaction.methodId,
    network,
    nonce: Number(scanTransaction.nonce),
    projectId,
    timestamp: Number(scanTransaction.timeStamp),
    toAddress: normalizeAddress(scanTransaction.to),
    transactionHash: scanTransaction.hash,
    transactionIndex: Number(scanTransaction.transactionIndex),
    txReceiptStatus: Number(scanTransaction.txreceipt_status),
    value: scanTransaction.value
  }
}

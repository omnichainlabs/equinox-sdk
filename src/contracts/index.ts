import { SCAN_MAP } from '../constants.js'
import {
  Address,
  Contract,
  Network,
  ScanContract
} from '../types.js'

const NUM_SCAN_PAGES = 10

export async function fetchAllContracts (ownerAddress: Address): Promise<Contract[]> {
  const contracts: Contract[] = []
  const scanContracts: ScanContract[] = await getAllScanContracts(ownerAddress)
  for await (const scanContract of scanContracts) {
    try {
      const newContracts: Contract[] = await fetchContractsFromScanContract(scanContract)
      contracts.push(...newContracts)
    } catch (error) {
      console.error(error)
    }
    await new Promise((resolve) => setTimeout(resolve, 300)) // to avoid being rate limited
  }
  return contracts
}

async function getAllScanContracts (ownerAddress: Address): Promise<ScanContract[]> {
  const scanContracts: ScanContract[] = []
  await Promise.all(
    Object.values(Network).map(async (network: Network) => {
      try {
        for (let page = 1; page <= NUM_SCAN_PAGES; ++page) {
          const res = await fetch(
            `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlist&address=${ownerAddress}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
          )
          const contracts = await res.json()
          if (!contracts || !contracts.result || typeof contracts.result !== typeof [] || contracts.result.length === 0) {
            break
          }
          contracts.result.forEach((contract: any) => {
            if (contract.contractAddress && contract.contractAddress !== '') {
              scanContracts.push({
                address: contract.contractAddress.toString(),
                network
              })
            }
          })
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
  return scanContracts
}

export async function fetchContractsFromScanContract (scanContract: ScanContract): Promise<Contract[]> {
  const res = await fetch(
    `${SCAN_MAP[scanContract.network].apiUrl}/api?module=account&action=txlist&address=${scanContract.address
    }&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${SCAN_MAP[scanContract.network].apiKey}`
  )
  const contracts = await res.json()
  return contracts.result.map(scanContractToContract)
}

function scanContractToContract (ProjectId: string, ContractId: string, Network: Network, data: any): Contract {
  return {
    ProjectId,
    ContractId,
    Network,
    ContractAddress: data.contractAddress.toLowerCase().trim(),
    OwnerAddress: data.from,
    BlockNumber: Number(data.blockNumber),
    Timestamp: Number(data.timeStamp),
    BlockHash: data.blockHash,
    Confirmations: Number(data.confirmations),
    CumulativeGasUsed: Number(data.cumulativeGasUsed),
    FunctionName: data.functionName,
    Gas: Number(data.gas),
    GasPrice: Number(data.gasPrice),
    GasUsed: Number(data.gasUsed),
    Hash: data.hash,
    Input: data.input,
    IsError: data.isError,
    MethodId: data.methodId,
    Nonce: Number(data.nonce),
    TransactionIndex: Number(data.transactionIndex),
    TxReceiptStatus: data.txreceipt_status,
    Value: data.value
  }
}

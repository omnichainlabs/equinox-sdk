import { SCAN_MAP } from '../constants.js'
import {
  Address,
  Contract,
  Network,
  ScanContract,
  UserProps
} from '../types.js'

const NUM_SCAN_PAGES = 10
const RATE_LIMIT_INTERVAL_MS = 300

export async function getAllContracts (ownerAddress: Address, user: UserProps): Promise<Contract[]> {
  let contracts: Contract[] = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${user.email}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    contracts = await response.json()
    if (contracts.length === 0) {
      contracts = await fetchAllContracts(ownerAddress)
      for (const contract of contracts) {
        await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts`, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(contract),
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
  return contracts
}

async function fetchContractPage (ownerAddress: Address, network: Network, page: number): Promise<Contract[]> {
  const contracts: Contract[] = []
  const res = await fetch(
    `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlist&address=${ownerAddress}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
  )
  const scanContracts = await res.json()
  if (typeof scanContracts?.result === typeof [] && scanContracts?.result?.length > 0) {
    scanContracts.result.forEach((scanContract: ScanContract) => {
      if (scanContract.contractAddress !== '') {
        contracts.push(scanContractToContract(network, scanContract))
      }
    })
  }
  return contracts
}

async function fetchContractNetwork (ownerAddress: Address, network: Network): Promise<Contract[]> {
  const contracts: Contract[] = []
  try {
    for (let page = 1; page <= NUM_SCAN_PAGES; ++page) {
      const newContracts = await fetchContractPage(ownerAddress, network, page)
      contracts.push(...newContracts)
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_INTERVAL_MS))
    }
  } catch (error) {
    console.error(error)
  }
  return contracts
}

async function fetchAllContracts (ownerAddress: Address): Promise<Contract[]> {
  return (await Promise.all(
    Object.values(Network).map(async (network: Network): Promise<Contract[]> => await fetchContractNetwork(ownerAddress, network))
  )).flat()
}

export async function fetchOneContract (ownerAddress: Address, network: Network, contractAddress: Address): Promise<Contract> {
  const contracts = await fetchContractNetwork(ownerAddress, network)
  const filteredContracts = contracts.filter((contract: Contract) => contract.ContractAddress === contractAddress)
  if (filteredContracts.length === 0) {
    throw new Error(`The address ${ownerAddress} has not deployed any contracts with address ${contractAddress} on ${network}!`)
  }
  return filteredContracts[0]
}

function scanContractToContract (Network: Network, scanContract: ScanContract): Contract {
  return {
    ProjectId: 'My First Project',
    ContractId: scanContract.contractAddress.toLowerCase().trim(),
    Network,
    ContractAddress: scanContract.contractAddress.toLowerCase().trim(),
    OwnerAddress: scanContract.from,
    BlockNumber: Number(scanContract.blockNumber),
    Timestamp: Number(scanContract.timeStamp),
    BlockHash: scanContract.blockHash,
    Confirmations: Number(scanContract.confirmations),
    CumulativeGasUsed: Number(scanContract.cumulativeGasUsed),
    FunctionName: scanContract.functionName,
    Gas: Number(scanContract.gas),
    GasPrice: Number(scanContract.gasPrice),
    GasUsed: Number(scanContract.gasUsed),
    Hash: scanContract.hash,
    Input: scanContract.input,
    IsError: scanContract.isError,
    MethodId: scanContract.methodId,
    Nonce: Number(scanContract.nonce),
    TransactionIndex: Number(scanContract.transactionIndex),
    TxReceiptStatus: scanContract.txreceipt_status,
    Value: scanContract.value
  }
}

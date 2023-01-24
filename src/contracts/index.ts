import { SCAN_MAP } from '../constants.js'
import {
  Address,
  Contract,
  Network,
  ScanContract,
  UserProps
} from '../types.js'

const NUM_SCAN_PAGES = 10

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

async function fetchAllContracts (ownerAddress: Address): Promise<Contract[]> {
  const contracts: Contract[] = []
  await Promise.all(
    Object.values(Network).map(async (network: Network): Promise<void> => {
      try {
        for (let page = 1; page <= NUM_SCAN_PAGES; ++page) {
          const res = await fetch(
            `${SCAN_MAP[network].apiUrl}/api?module=account&action=txlist&address=${ownerAddress}&startblock=0&endblock=99999999&page=${page}&offset=10&sort=asc&apikey=${SCAN_MAP[network].apiKey}`
          )
          const scanContracts = await res.json()
          if (typeof scanContracts?.result !== typeof [] || scanContracts?.result?.length === 0) {
            break
          }
          scanContracts.result.forEach((scanContract: ScanContract) => {
            if (scanContract.contractAddress !== '') {
              contracts.push(scanContractToContract(network, scanContract))
            }
          })
          await new Promise((resolve) => setTimeout(resolve, 300)) // to avoid being rate limited
        }
      } catch (error) {
        console.error(error)
      }
    })
  )
  return contracts
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

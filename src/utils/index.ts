import { Network as EthersNetwork } from '@ethersproject/networks'
import { NETWORK_MAP } from '../constants.js'
import {
  Address,
  ISOString,
  Network,
  Transaction,
  TransactionHash,
  TransactionStatus,
  URL
} from '../types.js'

export * from './alchemy.js'
export * from './thirdweb.js'

export const S_PER_DAY: number = 24 * 60 * 60
export const MS_PER_S: number = 1000
export const MS_PER_DAY: number = MS_PER_S * S_PER_DAY
export const GWEI_PER_ETH: number = 1e9
export const WEI_PER_GWEI: number = 1e9

export async function parseFetchResponse (response: Response): Promise<any> {
  if (response.status === 204) {
    return // no content, cannot parse JSON
  }
  const result = await response.json()
  if (response.status < 200 || response.status >= 300) {
    throw new Error(JSON.stringify(result))
  }
  return result
}

export function abbreviateAddress (address: Address): string {
  return `${address.slice(0, 6)}..${address.slice(address.length - 4)}`
}

export function normalizeAddress (rawAddress: string): Address {
  return rawAddress.toLowerCase().trim()
}

export function daysDeployedFromISOString (isoString: ISOString): number {
  return daysDeployedFromDate(new Date(isoString))
}

export function daysDeployedFromEpochTimeS (epochTimeS: number): number {
  return daysDeployedFromDate(new Date(epochTimeS * MS_PER_S))
}

export function daysDeployedFromDate (date: Date): number {
  return Math.ceil((Date.now() - date.getTime()) / MS_PER_DAY)
}

export async function sleep (intervalMs: number): Promise<void> {
  await new Promise((resolve: (value: null) => void) => setTimeout(resolve, intervalMs))
}

export function ethersNetworkToNetwork (network: EthersNetwork): Network {
  switch (network.chainId) {
    case 1:
      return Network.Ethereum
    case 5:
      return Network.Goerli
    case 10:
      return Network.Optimism
    case 137:
      return Network.Polygon
    case 28528:
      return Network.OptimismGoerli
    case 43113:
      return Network.Fuji
    case 43114:
      return Network.Avalanche
    case 80001:
      return Network.Mumbai
    case 11155111:
      return Network.Sepolia
    default:
      return Network.Mumbai
  }
}

export function getDetailsPageLink ({
  network,
  address,
  transactionHash
}: {
  network: Network
  address?: Address
  transactionHash?: TransactionHash
}): URL {
  if (address !== undefined) {
    return `${NETWORK_MAP[network].scanUrl}/address/${address}`
  } else if (transactionHash !== undefined) {
    return `${NETWORK_MAP[network].scanUrl}/tx/${transactionHash}`
  } else {
    return ''
  }
}

export function normalizeAddressOrProxyAddress (transaction: Transaction): Address | undefined {
  if (transaction.contractAddress !== undefined && transaction.contractAddress !== '') {
    return normalizeAddress(transaction.contractAddress)
  }
  if (transaction.proxyContractAddress !== undefined && transaction.proxyContractAddress !== '') {
    return normalizeAddress(transaction.proxyContractAddress)
  }
}

export function weiToGwei (wei: number): number {
  return wei / WEI_PER_GWEI
}

export function gweiToEth (gwei: number): number {
  return gwei / GWEI_PER_ETH
}

export function weiToEth (wei: number): number {
  return gweiToEth(weiToGwei(wei))
}

export function gweiToWei (gwei: number): number {
  return gwei * WEI_PER_GWEI
}

export function ethToGwei (eth: number): number {
  return eth * GWEI_PER_ETH
}

export function ethToWei (eth: number): number {
  return gweiToWei(ethToGwei(eth))
}

export function transactionStatusToString (transactionStatus: TransactionStatus, pastTense: boolean): string {
  switch (transactionStatus) {
    case TransactionStatus.Failure:
      return pastTense ? 'Failed' : 'Failure'
    case TransactionStatus.Success:
      return pastTense ? 'Succeeded' : 'Success'
  }
}

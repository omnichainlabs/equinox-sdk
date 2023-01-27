import { Network as EthersNetwork } from '@ethersproject/networks'
import {
  Address,
  ISOString,
  Network
} from '../types.js'

export * from './alchemy.js'

export const S_PER_DAY: number = 24 * 60 * 60
export const MS_PER_S: number = 1000
export const MS_PER_DAY: number = MS_PER_S * S_PER_DAY

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
    case 42161:
      return Network.Arbitrum
    case 43113:
      return Network.Fuji
    case 43114:
      return Network.Avalanche
    case 80001:
      return Network.Mumbai
    case 421613:
      return Network.ArbitrumGoerli
    case 11155111:
      return Network.Sepolia
    default:
      return Network.Mumbai
  }
}
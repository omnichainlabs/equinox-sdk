import { Address } from './types.js'

export function abbreviateAddress (address: Address): string {
  return `${address.slice(0, 6)}..${address.slice(address.length - 4)}`
}

export function normalizeAddress (rawAddress: string): Address {
  return rawAddress.toLowerCase().trim()
}

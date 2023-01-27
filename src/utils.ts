import {
  Address,
  ISOString
} from './types.js'

const S_PER_DAY: number = 24 * 60 * 60
const MS_PER_S: number = 1000
const MS_PER_DAY: number = MS_PER_S * S_PER_DAY

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

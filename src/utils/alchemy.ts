import {
  Alchemy,
  Network
} from 'alchemy-sdk'

let alchemySingletonObject: Alchemy

export const alchemySingleton = (): Alchemy => {
  const alchemySettings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI
  }
  if (alchemySingletonObject === undefined) {
    alchemySingletonObject = new Alchemy(alchemySettings)
  }
  return alchemySingletonObject
}

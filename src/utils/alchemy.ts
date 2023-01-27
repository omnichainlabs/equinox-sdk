import {
  Alchemy,
  Network
} from 'alchemy-sdk'

let alchemySingleton: Alchemy

const AlchemySingleton = (): Alchemy => {
  const alchemySettings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI
  }
  if (alchemySingleton === undefined) {
    alchemySingleton = new Alchemy(alchemySettings)
  }
  return alchemySingleton
}

export default AlchemySingleton

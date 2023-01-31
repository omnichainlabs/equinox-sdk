import { Alchemy } from 'alchemy-sdk'

import {
  NETWORK_MAP,
  TESTNET_NETWORKS
} from '../constants.js'
import { Network } from '../types.js'

const alchemySingletons: Partial<Record<Network, Alchemy>> = {}

const alchemySingleton = (network: Network): Alchemy => {
  if (!TESTNET_NETWORKS.includes(network)) {
    throw new Error('Currently, only testnet networks are supported.')
  }
  const alchemySettings = {
    apiKey: NETWORK_MAP[network].alchemyApiKey,
    network: NETWORK_MAP[network].alchemyNetwork
  }
  if (alchemySingletons[network] === undefined) {
    alchemySingletons[network] = new Alchemy(alchemySettings)
  }
  return alchemySingletons[network]!
}

export default alchemySingleton

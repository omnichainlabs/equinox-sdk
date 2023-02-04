import { Alchemy } from 'alchemy-sdk'

import {
  NETWORK_MAP,
  TESTNET_NETWORKS
} from '../constants.js'
import { Network } from '../types.js'

const alchemySingletons: Partial<Record<Network, Alchemy>> = {}

export const alchemySingleton = (network: Network): Alchemy => {
  if (!TESTNET_NETWORKS.includes(network)) {
    throw new Error('Currently, only testnet networks are supported.')
  }
  if (alchemySingletons[network] === undefined) {
    alchemySingletons[network] = new Alchemy({
      apiKey: NETWORK_MAP[network].alchemyApiKey,
      network: NETWORK_MAP[network].alchemyNetwork
    })
  }
  return alchemySingletons[network]!
}

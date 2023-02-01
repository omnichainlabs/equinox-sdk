import { ThirdwebSDK } from '@thirdweb-dev/sdk'
import {
  NETWORK_MAP,
  TESTNET_NETWORKS
} from '../constants.js'
import { Network } from '../types.js'

const thirdwebSingletons: Partial<Record<Network, ThirdwebSDK>> = {}

const thirdwebSingleton = (network: Network): ThirdwebSDK => {
  if (!TESTNET_NETWORKS.includes(network)) {
    throw new Error('Currently, only testnet networks are supported.')
  }
  if (thirdwebSingletons[network] === undefined) {
    thirdwebSingletons[network] = ThirdwebSDK.fromPrivateKey(
      process.env.THIRDWEB_PRIVATE_KEY,
      NETWORK_MAP[network].thirdwebNetwork!
    )
  }
  return thirdwebSingletons[network]!
}

export default thirdwebSingleton

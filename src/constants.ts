import { Network as AlchemyNetwork } from 'alchemy-sdk'

import {
  Network,
  NetworkInfo
} from './types.js'

export const SCAN_RATE_LIMIT_INTERVAL_MS = 300

export const TESTNET_NETWORKS = [
  Network.Goerli,
  Network.Mumbai,
  Network.OptimismGoerli
]

export const NETWORK_MAP: Record<Network, NetworkInfo> = {
  [Network.Ethereum]: {
    alchemyApiKey: process.env.ALCHEMY_ETHEREUM_KEY,
    alchemyNetwork: AlchemyNetwork.ETH_MAINNET,
    scanApiUrl: 'https://api.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_ETHEREUM_KEY,
    scanUrl: 'https://etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'ethereum'
  },
  [Network.Goerli]: {
    alchemyApiKey: process.env.ALCHEMY_GOERLI_KEY,
    alchemyNetwork: AlchemyNetwork.ETH_GOERLI,
    scanApiUrl: 'https://api-goerli.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_GOERLI_KEY,
    scanUrl: 'https://goerli.etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'goerli'
  },
  [Network.Sepolia]: {
    scanApiUrl: 'https://api-sepolia.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_SEPOLIA_KEY,
    scanUrl: 'https://sepolia.etherscan.io',
    scanName: 'Etherscan'
  },
  [Network.Polygon]: {
    alchemyApiKey: process.env.ALCHEMY_POLYGON_KEY,
    alchemyNetwork: AlchemyNetwork.MATIC_MAINNET,
    scanApiUrl: 'https://api.polygonscan.com',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_POLYGON_KEY,
    scanUrl: 'https://polygonscan.com',
    scanName: 'PolygonScan',
    thirdwebNetwork: 'polygon'
  },
  [Network.Mumbai]: {
    alchemyApiKey: process.env.ALCHEMY_MUMBAI_KEY,
    alchemyNetwork: AlchemyNetwork.MATIC_MUMBAI,
    scanApiUrl: 'https://api-testnet.polygonscan.com',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_MUMBAI_KEY,
    scanUrl: 'https://mumbai.polygonscan.com',
    scanName: 'PolygonScan',
    thirdwebNetwork: 'mumbai'
  },
  [Network.Avalanche]: {
    scanApiUrl: 'https://api.snowtrace.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_AVALANCHE_KEY,
    scanUrl: 'https://snowtrace.io',
    scanName: 'Snowtrace',
    thirdwebNetwork: 'avalanche'
  },
  [Network.Fuji]: {
    scanApiUrl: 'https://api-testnet.snowtrace.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_FUJI_KEY,
    scanUrl: 'https://testnet.snowtrace.io',
    scanName: 'Snowtrace',
    thirdwebNetwork: 'avalanche-fuji'
  },
  [Network.Optimism]: {
    alchemyApiKey: process.env.ALCHEMY_OPTIMISM_KEY,
    alchemyNetwork: AlchemyNetwork.OPT_MAINNET,
    scanApiUrl: 'https://api-optimistic.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_KEY,
    scanUrl: 'https://optimistic.etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'optimism'
  },
  [Network.OptimismGoerli]: {
    alchemyApiKey: process.env.ALCHEMY_OPTIMISM_GOERLI_KEY,
    alchemyNetwork: AlchemyNetwork.OPT_GOERLI,
    scanApiUrl: 'https://api-goerli-optimistic.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_GOERLI_KEY,
    scanUrl: 'https://goerli-optimism.etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'optimism-goerli'
  }
}

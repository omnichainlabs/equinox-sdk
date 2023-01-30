import {
  Network,
  ScanInfo
} from './types.js'

export const SCAN_RATE_LIMIT_INTERVAL_MS = 300

export const SCAN_MAP: Record<Network, ScanInfo> = {
  [Network.Mumbai]: {
    apiUrl: 'https://api-testnet.polygonscan.com',
    explorerUrl: 'https://mumbai.polygonscan.com',
    apiKey: process.env.NEXT_PUBLIC_SCAN_MUMBAI_KEY
  },
  [Network.Polygon]: {
    apiUrl: 'https://api.polygonscan.com',
    explorerUrl: 'https://polygonscan.com',
    apiKey: process.env.NEXT_PUBLIC_SCAN_POLYGON_KEY
  },
  [Network.Ethereum]: {
    apiUrl: 'https://api.etherscan.io',
    explorerUrl: 'https://etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_ETHEREUM_KEY
  },
  [Network.Goerli]: {
    apiUrl: 'https://api-goerli.etherscan.io',
    explorerUrl: 'https://goerli.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_GOERLI_KEY
  },
  [Network.Sepolia]: {
    apiUrl: 'https://api-sepolia.etherscan.io',
    explorerUrl: 'https://sepolia.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_SEPOLIA_KEY
  },
  [Network.Avalanche]: {
    apiUrl: 'https://api.snowtrace.io',
    explorerUrl: 'https://snowtrace.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_AVALANCHE_KEY
  },
  [Network.Fuji]: {
    apiUrl: 'https://api-testnet.snowtrace.io',
    explorerUrl: 'https://testnet.snowtrace.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_FUJI_KEY
  },
  [Network.Optimism]: {
    apiUrl: 'https://api-optimistic.etherscan.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_KEY
  },
  [Network.OptimismGoerli]: {
    apiUrl: 'https://api-goerli-optimistic.etherscan.io',
    explorerUrl: 'https://goerli-optimism.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_GOERLI_KEY
  }
}

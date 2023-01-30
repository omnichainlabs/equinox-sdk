import {
  Network,
  ScanInfo
} from './types.js'

export const SCAN_RATE_LIMIT_INTERVAL_MS = 300

export const SCAN_MAP: Record<Network, ScanInfo> = {
  [Network.Mumbai]: {
    apiUrl: 'https://api-testnet.polygonscan.com',
    apiKey: process.env.NEXT_PUBLIC_SCAN_MUMBAI_KEY,
    explorerUrl: 'https://mumbai.polygonscan.com',
    explorerName: 'PolygonScan'
  },
  [Network.Polygon]: {
    apiUrl: 'https://api.polygonscan.com',
    apiKey: process.env.NEXT_PUBLIC_SCAN_POLYGON_KEY,
    explorerUrl: 'https://polygonscan.com',
    explorerName: 'PolygonScan'
  },
  [Network.Ethereum]: {
    apiUrl: 'https://api.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_ETHEREUM_KEY,
    explorerUrl: 'https://etherscan.io',
    explorerName: 'Etherscan'
  },
  [Network.Goerli]: {
    apiUrl: 'https://api-goerli.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_GOERLI_KEY,
    explorerUrl: 'https://goerli.etherscan.io',
    explorerName: 'Etherscan'
  },
  [Network.Sepolia]: {
    apiUrl: 'https://api-sepolia.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_SEPOLIA_KEY,
    explorerUrl: 'https://sepolia.etherscan.io',
    explorerName: 'Etherscan'
  },
  [Network.Avalanche]: {
    apiUrl: 'https://api.snowtrace.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_AVALANCHE_KEY,
    explorerUrl: 'https://snowtrace.io',
    explorerName: 'Snowtrace'
  },
  [Network.Fuji]: {
    apiUrl: 'https://api-testnet.snowtrace.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_FUJI_KEY,
    explorerUrl: 'https://testnet.snowtrace.io',
    explorerName: 'Snowtrace'
  },
  [Network.Optimism]: {
    apiUrl: 'https://api-optimistic.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_KEY,
    explorerUrl: 'https://optimistic.etherscan.io',
    explorerName: 'Etherscan'
  },
  [Network.OptimismGoerli]: {
    apiUrl: 'https://api-goerli-optimistic.etherscan.io',
    apiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_GOERLI_KEY,
    explorerUrl: 'https://goerli-optimism.etherscan.io',
    explorerName: 'Etherscan'
  }
}

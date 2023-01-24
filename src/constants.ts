import {
  Network,
  ScanInfo
} from './types.js'

export const SCAN_MAP: Record<Network, ScanInfo> = {
  [Network.Mumbai]: {
    apiUrl: 'https://api-testnet.polygonscan.com',
    explorerUrl: 'https://mumbai.polygonscan.com',
    apiKey: process.env.POLYGONSCAN_KEY
  },
  [Network.Polygon]: {
    apiUrl: 'https://api.polygonscan.com',
    explorerUrl: 'https://polygonscan.com',
    apiKey: process.env.POLYGONSCAN_KEY
  },
  [Network.Ethereum]: {
    apiUrl: 'https://api.etherscan.io',
    explorerUrl: 'https://etherscan.io',
    apiKey: process.env.ETHERSCAN_KEY
  },
  [Network.Goerli]: {
    apiUrl: 'https://api-goerli.etherscan.io',
    explorerUrl: 'https://goerli.etherscan.io',
    apiKey: process.env.ETHERSCAN_KEY
  },
  [Network.Sepolia]: {
    apiUrl: 'https://api-sepolia.etherscan.io',
    explorerUrl: 'https://sepolia.etherscan.io',
    apiKey: process.env.ETHERSCAN_KEY
  },
  [Network.Avalanche]: {
    apiUrl: 'https://api.snowtrace.io',
    explorerUrl: 'https://snowtrace.io',
    apiKey: process.env.SNOWTRACE_KEY
  },
  [Network.Fuji]: {
    apiUrl: 'https://api-testnet.snowtrace.io',
    explorerUrl: 'https://testnet.snowtrace.io',
    apiKey: process.env.SNOWTRACE_KEY
  },
  [Network.Arbitrum]: {
    apiUrl: 'https://api.arbiscan.io',
    explorerUrl: 'https://arbiscan.io',
    apiKey: process.env.ARBISCAN_KEY
  },
  [Network.ArbitrumGoerli]: {
    apiUrl: 'https://api-goerli.arbiscan.io',
    explorerUrl: 'https://goerli.arbiscan.io',
    apiKey: process.env.ARBISCAN_KEY
  },
  [Network.Optimism]: {
    apiUrl: 'https://api-optimistic.etherscan.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    apiKey: process.env.ETHERSCAN_KEY
  },
  [Network.OptimismGoerli]: {
    apiUrl: 'https://api-goerli-optimistic.etherscan.io',
    explorerUrl: 'https://goerli-optimism.etherscan.io',
    apiKey: process.env.ETHERSCAN_KEY
  }
}

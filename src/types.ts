export type Address = string

export enum Network {
  Ethereum = 'ethereum',
  Goerli = 'goerli',
  Sepolia = 'sepolia',
  Polygon = 'polygon',
  Mumbai = 'mumbai',
  Avalanche = 'avalanche',
  Fuji = 'fuji',
  Arbitrum = 'arbitrum',
  ArbitrumGoerli = 'arbitrum-goerli',
  Optimism = 'optimism',
  OptimismGoerli = 'optimism-goerli'
}

export interface Contract {
  address: Address
  network: Network
}

export interface ScanInfo {
  apiUrl: string
  explorerUrl: string
  apiKey: string
}

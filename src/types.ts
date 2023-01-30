export type Address = string

export interface Apikey {
  userId: string
  labelWithPrefix: string
  expiration: ISOString
  createdAt: ISOString
  totalRequests: number
  totalTimeElapsed: number
}

export interface ApikeyResponse extends Apikey {
  apikey: string
}

export interface ApikeyRequest {
  label: string
  expiration: ISOString
}

export type BlockHash = string

export interface Contract {
  projectId: string
  network: Network
  contractAddress: Address
  label?: string
}

export interface GateCollection {
  contractAddress: Address
  imageUrl: string
  name: string
  openSeaSlug: string
};

export interface GateItem {
  userId: string
  gateId: string
  content: string
  mustHaveAll: boolean
  collections: GateCollection[]
};

export type ISOString = string

export interface Project {
  projectId: string
  adminUserIds: string[]
}

export enum Network {
  Ethereum = 'Ethereum',
  Goerli = 'Goerli',
  Sepolia = 'Sepolia',
  Polygon = 'Polygon',
  Mumbai = 'Mumbai',
  Avalanche = 'Avalanche',
  Fuji = 'Fuji',
  Optimism = 'Optimism',
  OptimismGoerli = 'OptimismGoerli'
}

export interface NFTMetadata {
  contractLabel: string
  network: Network
  description: string
  primaryPayoutAddress: Address
  secondaryPayoutAddress: Address
  royaltyPercentage: number
};

export interface ScanInfo {
  apiUrl: string
  explorerUrl: string
  apiKey: string
}

export interface ScanTransaction {
  blockHash: BlockHash
  blockNumber: string
  confirmations: string
  contractAddress: Address
  cumulativeGasUsed: string
  from: Address
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: TransactionHash
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: Address
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export interface TransactionFromScan {
  blockHash?: BlockHash
  blockNumber: number
  confirmations?: number
  contractAddress?: Address
  cumulativeGasUsed?: number
  fromAddress: Address
  functionName?: string
  gas?: number
  gasPrice?: number
  gasUsed?: number
  input?: string
  isError?: string
  methodId?: string
  nonce?: number
  timestamp: number
  toAddress?: Address
  transactionHash: TransactionHash
  transactionIndex?: number
  txReceiptStatus?: TransactionStatus
  value?: string
}

export interface Transaction extends TransactionFromScan {
  contractLabel?: string
  network: Network
  projectId: string
  proxyContractAddress?: Address
}

export type TransactionHash = string

export enum TransactionStatus {
  Failure = 0,
  Success = 1,
}

export interface UserProps {
  name: string
  email: string
  avatar: string
  thumb: string
  role: string
  apikey: string
}

export interface Wallet {
  projectId: string
  network: Network
  walletAddress: Address
}

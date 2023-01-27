export type Address = string

export interface Apikey {
  UserId: string
  Label: string
  Expiration: ISOString
  Hash: string
  CreatedAt: ISOString
  TotalRequests: number
  TotalTimeElapsed: number
};

export interface GateCollection {
  ContractAddress: Address
  ImageUrl: string
  Name: string
  OpenSeaSlug: string
};

export interface GateItem {
  UserId: string
  GateId: string
  Content: string
  MustHaveAll: boolean
  Collections: GateCollection[]
};

export type ISOString = string

export interface Project {
  ProjectId: string
  AdminUserIds: string[]
}

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

export interface NFTMetadata {
  ContractId: string
  Network: Network
  Description: string
  PrimaryPayoutAddress: Address
  SecondaryPayoutAddress: Address
  RoyaltyPercentage: number
};

export interface ScanInfo {
  apiUrl: string
  explorerUrl: string
  apiKey: string
}

export interface ScanTransaction {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  timeStamp: string
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export interface Transaction {
  BlockHash?: string
  BlockNumber: number
  Confirmations?: number
  ContractAddress?: Address
  ContractId?: string
  CumulativeGasUsed?: number
  FromAddress: Address
  FunctionName?: string
  Gas?: number
  GasPrice?: number
  GasUsed?: number
  Hash?: string
  Input?: string
  IsError?: string
  MethodId?: string
  Network: Network
  Nonce?: number
  ProjectId: string
  Timestamp: number
  ToAddress?: Address
  TransactionId: string
  TransactionIndex?: number
  TxReceiptStatus?: TransactionStatus
  Value?: string
}

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

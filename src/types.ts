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

export interface UserProps {
  email: string
  apikey: string
}

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
  TransactionIndex?: number
  TxReceiptStatus?: string
  Value?: string
}

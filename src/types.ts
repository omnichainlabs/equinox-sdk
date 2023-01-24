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

export interface ScanContract {
  contractAddress: string
  from: string
  to: string
  blockNumber: string
  timeStamp: string
  blockHash: string
  confirmations: string
  cumulativeGasUsed: string
  functionName: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  methodId: string
  nonce: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export interface Contract {
  ProjectId: string
  ContractId: string
  Network: Network
  ContractAddress: Address
  OwnerAddress: Address
  BlockNumber: number
  Timestamp: number
  BlockHash?: string
  Confirmations?: number
  CumulativeGasUsed?: number
  FunctionName?: string
  Gas?: number
  GasPrice?: number
  GasUsed?: number
  Hash?: string
  Input?: string
  IsError?: string
  MethodId?: string
  Nonce?: number
  TransactionIndex?: number
  TxReceiptStatus?: string
  Value?: string
}

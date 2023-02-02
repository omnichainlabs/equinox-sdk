import { ChainOrRpc as ThirdwebNetwork } from '@thirdweb-dev/sdk'
import { Network as AlchemyNetwork } from 'alchemy-sdk'

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
  apikey: UUID
}

export interface ApikeyRequest {
  label: string
  expiration: ISOString
}

export type BlockHash = string

export interface Claim {
  projectId: string
  claimId: string
  network: Network
  contractAddress: Address
  tokenId?: string
  claimedWalletAddress?: Address
}

export interface ClaimRequest {
  projectId: string
  claimId: string
  network: Network
  walletAddress: Address
}

export interface Contract {
  projectId: string
  network: Network
  contractAddress: Address
  thirdwebContractType?: ThirdwebContractType
  label?: string
}

export interface ContractResponse extends Contract {
  transactionHash?: TransactionHash
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

export interface NetworkInfo {
  alchemyApiKey?: string
  alchemyNetwork?: AlchemyNetwork
  scanApiUrl: string
  scanApiKey: string
  scanUrl: string
  scanName: string
  thirdwebNetwork?: ThirdwebNetwork
}

export interface NFTMetadata {
  contractLabel: string
  network: Network
  description: string
  primaryPayoutAddress: Address
  secondaryPayoutAddress: Address
  royaltyPercentage: number
};

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

export interface ThirdwebContract {
  title: string
  description: string
  content: string
  method: ThirdwebContractType
  standard: ThirdwebTokenStandard
}

export enum ThirdwebContractType {
  Edition = 'Edition',
  EditionDrop = 'EditionDrop',
  Marketplace = 'Marketplace',
  NFTCollection = 'NFTCollection',
  NFTDrop = 'NFTDrop',
  Pack = 'Pack',
  SignatureDrop = 'SignatureDrop',
  Split = 'Split',
  Token = 'Token',
  TokenDrop = 'TokenDrop',
  Vote = 'Vote'
}

export enum ThirdwebTokenStandard {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
  Marketplace = 'Marketplace',
  Split = 'Split',
  Vote = 'Vote'
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
  thirdwebContractType?: ThirdwebContractType
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

export type UUID = string

export interface Wallet {
  projectId: string
  network: Network
  walletAddress: Address
}

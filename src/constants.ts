import { Network as AlchemyNetwork } from 'alchemy-sdk'

import {
  Network,
  NetworkInfo,
  ThirdwebContract,
  ThirdwebContractType,
  ThirdwebTokenStandard
} from './types.js'

export const SCAN_RATE_LIMIT_INTERVAL_MS = 300

export const TESTNET_NETWORKS = [
  Network.Goerli,
  Network.Mumbai,
  Network.OptimismGoerli
]

export const NETWORK_MAP: Record<Network, NetworkInfo> = {
  [Network.Ethereum]: {
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_KEY,
    alchemyNetwork: AlchemyNetwork.ETH_MAINNET,
    scanApiUrl: 'https://api.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_ETHEREUM_KEY,
    scanUrl: 'https://etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'ethereum'
  },
  [Network.Goerli]: {
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_KEY,
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
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_KEY,
    alchemyNetwork: AlchemyNetwork.MATIC_MAINNET,
    scanApiUrl: 'https://api.polygonscan.com',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_POLYGON_KEY,
    scanUrl: 'https://polygonscan.com',
    scanName: 'PolygonScan',
    thirdwebNetwork: 'polygon'
  },
  [Network.Mumbai]: {
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_KEY,
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
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_KEY,
    alchemyNetwork: AlchemyNetwork.OPT_MAINNET,
    scanApiUrl: 'https://api-optimistic.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_KEY,
    scanUrl: 'https://optimistic.etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'optimism'
  },
  [Network.OptimismGoerli]: {
    alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPTIMISM_GOERLI_KEY,
    alchemyNetwork: AlchemyNetwork.OPT_GOERLI,
    scanApiUrl: 'https://api-goerli-optimistic.etherscan.io',
    scanApiKey: process.env.NEXT_PUBLIC_SCAN_OPTIMISM_GOERLI_KEY,
    scanUrl: 'https://goerli-optimism.etherscan.io',
    scanName: 'Etherscan',
    thirdwebNetwork: 'optimism-goerli'
  }
}

export const THIRDWEB_CONTRACTS_MAP: Record<ThirdwebContractType, ThirdwebContract> = {
  [ThirdwebContractType.Edition]: {
    title: 'Edition',
    description: 'Produce multiple versions of ERC1155 tokens',
    content: 'The Edition contract is an appropriate option when you plan to release multiple NFTs based on the same asset, but you don\'t want to "drop" or "release" them for your audience to acquire. Unlike the Edition Drop contract, the Edition contract does not use lazy minting for the NFTs.--LINEBREAK-- Instead, the NFTs are minted as soon as they are added to the collection. This means that you can still transfer the NFTs or sell them on a marketplace and perform any other actions you would expect to do with an NFT. For advanced use cases, the Edition contract also has the capability of minting NFTs using signatures.',
    method: ThirdwebContractType.Edition,
    standard: ThirdwebTokenStandard.ERC1155
  },
  [ThirdwebContractType.EditionDrop]: {
    title: 'Edition Drop',
    description: 'Make ERC1155 tokens available for purchase at a low cost',
    content: 'The Edition Drop contract is best used when you want to release many NFTs based on the same asset and uses the ERC1155 Standard, also known as "Semi-Fungible Tokens".--LINEBREAK-- The Edition Drop contract allows you to define the conditions for when and how your users can mint an NFT, including allowlists, release dates, and claim limits.',
    method: ThirdwebContractType.EditionDrop,
    standard: ThirdwebTokenStandard.ERC1155
  },
  [ThirdwebContractType.Marketplace]: {
    title: 'Marketplace',
    description: 'Trade ERC721/ERC1155 tokens with others',
    content: 'A Marketplace, like OpenSea or Rarible, is a smart contract that facilitates the buying and selling of NFTs.--LINEBREAK-- The marketplace contract enables users to post NFTs for direct purchase or auction. Other users can then submit offers or bids, or purchase the NFTs for the price listed in the offering. The marketplace can be configured to restrict listing rights to certain users, or to allow any user to list NFTs for sale.',
    method: ThirdwebContractType.Marketplace,
    standard: ThirdwebTokenStandard.Marketplace
  },
  [ThirdwebContractType.NFTCollection]: {
    title: 'NFT Collection',
    description: 'Assemble a set of one-of-a-kind NFTs',
    content: 'The NFT Collection contract is a good choice when you wish to assemble a set of one-of-a-kind NFTs, but not "drop" or "release" them for your audience to acquire. Unlike the NFT Drop contract, the NFT Collection contract does not use lazy minting for the NFTs.--LINEBREAK-- Instead, the NFTs are minted as soon as they are added to the collection. This means that you can still transfer the NFTs or sell them on a marketplace and perform any other actions you would expect to do with an NFT. For advanced use cases, the NFT Collection contract also has the capability of minting NFTs using signatures.',
    method: ThirdwebContractType.NFTCollection,
    standard: ThirdwebTokenStandard.ERC721
  },
  [ThirdwebContractType.NFTDrop]: {
    title: 'NFT Drop',
    description: 'Offer a collection of one-of-a-kind NFTs at a fixed price',
    content: 'The NFT Drop contract is a great option when you plan to release a set of one-of-a-kind NFTs that comply with the ERC721A Standard. It enables you to establish a series of claim phases, each with specific conditions such as whitelists, release dates, claim limits, and delayed unveilings.--LINEBREAK-- This allows you to control when and how your users can acquire an NFT from your drop. Keep in mind that when you add NFTs to the drop contract, they are not minted immediately, but are prepared for your users through a process called lazy minting, which allows other wallets to mint them.',
    method: ThirdwebContractType.NFTDrop,
    standard: ThirdwebTokenStandard.ERC721
  },
  [ThirdwebContractType.Pack]: {
    title: 'Pack',
    description: 'Group multiple tokens into ERC1155 NFTs that function as randomized loot',
    content: 'The Pack contract enables you to group ERC20, ERC721, and ERC1155 tokens into ERC1155 NFTs that function as randomized loot boxes.--LINEBREAK-- The packs are ERC1155 NFTs themselves, and can contain the standard metadata associated with NFTs, such as a name, image, description, etc. When a pack is opened, a pre-determined number of tokens are randomly chosen from the tokens used to create the packs (that have not been selected yet) and awarded to the person who opened it. The pack NFT is burned as it is opened. You can customize the configuration of the pack, such as how many tokens are in each "unit" (for ERC20 & ERC1155 tokens - one unit could be multiple tokens), and how many units are in each pack.',
    method: ThirdwebContractType.Pack,
    standard: ThirdwebTokenStandard.ERC1155
  },
  [ThirdwebContractType.SignatureDrop]: {
    title: 'Signature Drop',
    description: 'Create ERC721 tokens using signatures',
    content: 'The Signature Drop contract uses the ERC721A standard to offer a collection of one-of-a-kind NFTs. You can lazy-mint your NFTs by uploading the metadata and setting up a single claim phase, outlining the rules for how your users can acquire NFTs from your drop, such as whitelists, release dates, or delayed unveilings.--LINEBREAK-- The "signature" in the name refers to the signature-based minting feature, which allows you to give users the power to mint NFT(s) based on a custom set of criteria, checked on-demand.--LINEBREAK-- This feature is optional and independent of the claim phase conditions.',
    method: ThirdwebContractType.SignatureDrop,
    standard: ThirdwebTokenStandard.ERC721
  },
  [ThirdwebContractType.Split]: {
    title: 'Split',
    description: 'Divide funds among multiple recipients',
    content: 'The Split contract allows you to distribute funds among multiple recipients by specifying their wallet addresses. You can determine the percentage of funds that will be allocated to each recipient.--LINEBREAK-- For instance, you could specify 0x1 and 0x2 as recipients, and divide the funds sent to the split contract address equally between them.--LINEBREAK-- The split contract holds the funds and when a user triggers the distribute function, the funds will be distributed among the recipients as per the percentages defined.',
    method: ThirdwebContractType.Split,
    standard: ThirdwebTokenStandard.Split
  },
  [ThirdwebContractType.Token]: {
    title: 'Token',
    description: 'Develop a digital currency following ERC20 standards',
    content: 'The Token contract is an ideal solution for developing a digital currency that follows the ERC20 standard. It can be bought and sold between users on an exchange, used to purchase NFTs in a marketplace, and so on.--LINEBREAK-- Unlike the Token Drop contract, the Token contract does not provide users with the option to claim tokens based on certain claim conditions.',
    method: ThirdwebContractType.Token,
    standard: ThirdwebTokenStandard.ERC20
  },
  [ThirdwebContractType.TokenDrop]: {
    title: 'Token Drop',
    description: 'Offer new ERC20 tokens for sale at a fixed price',
    content: 'The Token Drop contract is a method of making your ERC20 tokens available for purchase at a fixed price. It enables you to establish the criteria for when and how your users can acquire your tokens, such as whitelists, release dates, and claim limits.--LINEBREAK-- With the Token Drop, you set the price for your tokens during each claim phase and can limit the number of tokens you want to release. Other users can then claim your tokens based on the conditions you defined.',
    method: ThirdwebContractType.TokenDrop,
    standard: ThirdwebTokenStandard.ERC20
  },
  [ThirdwebContractType.Vote]: {
    title: 'Vote',
    description: 'Initiate a vote on proposed ideas',
    content: 'The Vote contract is intended for organizations like DAOs to vote on proposals. To utilize the Vote contract, you will also need to have an existing ERC20 token, such as our token contract, to serve as the governance token.',
    method: ThirdwebContractType.Vote,
    standard: ThirdwebTokenStandard.Vote
  }
}

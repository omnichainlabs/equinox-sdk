import {
  UserProps,
  Wallet
} from '../types.js'

export async function getAllWallets ({
  user,
  ProjectId
}: {
  user: UserProps
  ProjectId: string
}): Promise<Wallet[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets/${ProjectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to GET /wallets')
    console.error(err)
  }
  return []
}

export async function getWallet ({
  user,
  ProjectId,
  WalletAddress
}: {
  user: UserProps
  ProjectId: string
  WalletAddress: string
}): Promise<Wallet[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets/${ProjectId}/${WalletAddress}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /wallets/${ProjectId}/${WalletAddress}`)
    console.error(err)
  }
  return []
}

export async function postWallet ({
  user,
  ProjectId,
  WalletAddress
}: {
  user: UserProps
  ProjectId: string
  WalletAddress: string
}): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        ProjectId,
        WalletAddress
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to POST /wallets')
    console.error(err)
  }
}

import {
  UserProps,
  Wallet
} from '../types.js'

export async function getAllWallets (user: UserProps, projectId: string): Promise<Wallet[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets/${projectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /wallets/${projectId}`)
    console.error(err)
  }
  return []
}

export async function deleteWallet (user: UserProps, wallet: Wallet): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(wallet),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to DELETE /wallets')
    console.error(err)
  }
}

export async function postWallet (user: UserProps, wallet: Wallet): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/wallets`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(wallet),
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

import {
  Network,
  Transaction,
  TransactionHash,
  UserProps
} from '../types.js'

export * from './fetchers.js'

export async function getAllTransactions ({
  user,
  projectId,
  contractsOnly = false,
  transactionsOnly = false
}: {
  user: UserProps
  projectId: string
  contractsOnly?: boolean
  transactionsOnly?: boolean
}): Promise<Transaction[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions/${projectId}?contractsOnly=${contractsOnly}&transactionsOnly=${transactionsOnly}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /transactions/${projectId}`)
    console.error(err)
  }
  return []
}

export async function getTransaction ({
  user,
  projectId,
  network,
  transactionHash
}: {
  user: UserProps
  projectId: string
  network: Network
  transactionHash: TransactionHash
}): Promise<Transaction | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions?projectId=${projectId}&network=${network}&transactionHash=${transactionHash}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to GET /transactions')
    console.error(err)
  }
}

export async function deleteTransaction (user: UserProps, transaction: Transaction): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to DELETE /transactions')
    console.error(err)
  }
}

export async function postTransaction (user: UserProps, transaction: Transaction): Promise<Transaction | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(transaction),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to POST /transactions')
    console.error(err)
  }
}

import {
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

export async function getTransaction (user: UserProps, projectId: string, transactionHash: TransactionHash): Promise<Transaction | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/projects/${projectId}/${transactionHash}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /transactions/${projectId}/${transactionHash}`)
    console.error(err)
  }
}

export async function deleteTransaction (user: UserProps, projectId: string, transactionHash: TransactionHash): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/transactions/${projectId}/${transactionHash}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /transactions/${projectId}/${transactionHash}`)
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

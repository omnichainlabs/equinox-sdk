import {
  Transaction,
  TransactionHash,
  UserProps
} from '../types.js'

export * from './fetchers.js'

export async function getAllTransactions ({
  user,
  ProjectId,
  contractsOnly = false,
  transactionsOnly = false
}: {
  user: UserProps
  ProjectId: string
  contractsOnly?: boolean
  transactionsOnly?: boolean
}): Promise<Transaction[]> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/transactions/${ProjectId}?contractsOnly=${contractsOnly}&transactionsOnly=${transactionsOnly}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /transactions/${ProjectId}`)
    console.error(err)
  }
  return []
}

export async function getTransaction (user: UserProps, ProjectId: string, TransactionHash: TransactionHash): Promise<Transaction | undefined> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/projects/${ProjectId}/${TransactionHash}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /transactions/${ProjectId}/${TransactionHash}`)
    console.error(err)
  }
}

export async function deleteTransaction (user: UserProps, ProjectId: string, TransactionHash: TransactionHash): Promise<void> {
  try {
    await fetch(`${process.env.BEANSTALK_SERVER_URL}/transactions/${ProjectId}/${TransactionHash}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /transactions/${ProjectId}/${TransactionHash}`)
    console.error(err)
  }
}

export async function postTransaction (user: UserProps, transaction: Transaction): Promise<Transaction | undefined> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/transactions`, {
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

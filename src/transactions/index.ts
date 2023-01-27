import {
  Transaction,
  UserProps
} from '../types.js'

export * from './fetchers.js'

export async function getAllTransactions ({
  projectId,
  user,
  contractsOnly = false,
  transactionsOnly = false
}: {
  projectId: string
  user: UserProps
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
    console.error('Error occurred when trying to GET /transactions')
    console.error(err)
  }
  return []
}

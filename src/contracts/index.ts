import {
  Contract,
  ContractResponse,
  TransactionHash,
  UserProps
} from '../types.js'

export async function getAllContracts (user: UserProps, projectId: string): Promise<Contract[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${projectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /contracts/${projectId}`)
    console.error(err)
  }
  return []
}

export async function deleteContract ({
  user,
  contract,
  shouldDeleteTransaction,
  transactionHash
}: {
  user: UserProps
  contract: Contract
  shouldDeleteTransaction?: boolean
  transactionHash?: TransactionHash
}): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify({
        ...contract,
        shouldDeleteTransaction,
        transactionHash
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to DELETE /contracts')
    console.error(err)
  }
}

export async function postContract (user: UserProps, contract: Contract): Promise<ContractResponse | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(contract),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to POST /contracts')
    console.error(err)
  }
}

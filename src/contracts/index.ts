import {
  Contract,
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

export async function getContract (user: UserProps, projectId: string, contractId: string): Promise<Contract | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${projectId}/${contractId}`)
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /contracts/${projectId}/${contractId}`)
    console.error(err)
  }
}

export async function deleteContract (user: UserProps, projectId: string, contractId: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${projectId}/${contractId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /contracts/${projectId}/${contractId}`)
    console.error(err)
  }
}

export async function postContract (user: UserProps, contract: Contract): Promise<Contract | undefined> {
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

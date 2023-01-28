import {
  Contract,
  UserProps
} from '../types.js'

export async function getAllContracts (user: UserProps, ProjectId: string): Promise<Contract[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${ProjectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /contracts/${ProjectId}`)
    console.error(err)
  }
  return []
}

export async function getContract (user: UserProps, ProjectId: string, ContractId: string): Promise<Contract | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${ProjectId}/${ContractId}`)
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /contracts/${ProjectId}/${ContractId}`)
    console.error(err)
  }
}

export async function deleteContract (user: UserProps, ProjectId: string, ContractId: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/contracts/${ProjectId}/${ContractId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /contracts/${ProjectId}/${ContractId}`)
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

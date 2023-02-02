import { parseFetchResponse } from '../index.js'
import {
  Email,
  GateItem,
  UserProps
} from '../types.js'

export async function getAllGates (user: UserProps): Promise<GateItem[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/gates`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to GET /gates')
    console.error(err)
  }
  return []
}

export async function getGate (userId: Email, gateId: string): Promise<GateItem | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/gates/${userId}/${gateId}`)
    return await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to GET /gates/${userId}/${gateId}`)
    console.error(err)
  }
}

export async function deleteGate (user: UserProps, gateId: string): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/gates/${gateId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /gates/${gateId}`)
    console.error(err)
  }
}

export async function postGate (user: UserProps, gate: GateItem): Promise<GateItem | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/gates`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(gate),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to POST /gates')
    console.error(err)
  }
}

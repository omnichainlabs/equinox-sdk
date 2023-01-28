import {
  GateItem,
  UserProps
} from '../types.js'

export async function getAllGates (user: UserProps): Promise<GateItem[]> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/gates`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to GET /gates')
    console.error(err)
  }
  return []
}

export async function getGate (UserId: string, GateId: string): Promise<GateItem | undefined> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/gates/${UserId}/${GateId}`)
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /gates/${UserId}/${GateId}`)
    console.error(err)
  }
}

export async function deleteGate (user: UserProps, GateId: string): Promise<void> {
  try {
    await fetch(`${process.env.BEANSTALK_SERVER_URL}/gates/${GateId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /gates/${GateId}`)
    console.error(err)
  }
}

export async function postGate (user: UserProps, gate: GateItem): Promise<GateItem | undefined> {
  try {
    const response = await fetch(`${process.env.BEANSTALK_SERVER_URL}/gates`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(gate),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to POST /gates')
    console.error(err)
  }
}

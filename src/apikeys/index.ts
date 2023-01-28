import {
  Apikey,
  ApikeyRequest,
  UserProps
} from '../types.js'

export async function getAllApikeys (user: UserProps): Promise<Apikey[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/apikeys`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to GET /apikeys')
    console.error(err)
  }
  return []
}

export async function deleteApikey (user: UserProps, Label: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/apikeys/${Label}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to DELETE /apikeys')
    console.error(err)
  }
}

export async function postApikey (user: UserProps, apikeyRequest: ApikeyRequest): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/apikeys`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(apikeyRequest),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error('Error occurred when trying to POST /apikeys')
    console.error(err)
  }
}

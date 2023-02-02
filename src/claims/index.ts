import { parseFetchResponse } from '../index.js'
import {
  Claim,
  ClaimRequest,
  UserProps
} from '../types.js'

export async function postClaim (user: UserProps, claim: Claim): Promise<Claim | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/claims`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(claim),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to POST /claims')
    console.error(err)
  }
}

export async function claimClaim (claimRequest: ClaimRequest): Promise<Claim | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/claims/${claimRequest.projectId}`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(claimRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to POST /claims/${claimRequest.projectId}`)
    console.error(err)
  }
}

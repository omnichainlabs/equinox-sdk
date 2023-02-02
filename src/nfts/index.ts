import { parseFetchResponse } from '../index.js';
import {
  Address,
  DropMetadata,
  Network,
  UserProps,
} from '../types.js';

export async function getDropMetadata({
  user,
  projectId,
  network,
  contractAddress,
  dropId,
}: {
  user: UserProps,
  projectId: string,
  network: Network,
  contractAddress: Address,
  dropId: number
}): Promise<DropMetadata | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/nfts/${projectId}?network=${network}&contractAddress=${contractAddress}&dropId=${dropId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to GET /nfts/${projectId}`)
    console.error(err)
  }
}

export async function postDropMetadata(user: UserProps, dropMetadata: DropMetadata): Promise<DropMetadata | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/nfts`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(dropMetadata),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to POST /nfts')
    console.error(err)
  }
}

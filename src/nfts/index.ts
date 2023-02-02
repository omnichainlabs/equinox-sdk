import { parseFetchResponse } from '../index.js'
import {
  DropMetadata,
  DropMetadataUrlParams,
  UserProps
} from '../types.js'

export function getDropMetadataUrl ({
  projectId,
  network,
  contractAddress,
  id
}: DropMetadataUrlParams): string {
  return `${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/nfts/${projectId}/${network}/${contractAddress}/${id}`
}

export async function getDropMetadata (dropMetadataUrlParams: DropMetadataUrlParams): Promise<DropMetadata | undefined> {
  try {
    const response = await fetch(getDropMetadataUrl(dropMetadataUrlParams))
    return await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to GET ${getDropMetadataUrl(dropMetadataUrlParams)}`)
    console.error(err)
  }
}

export async function postDropMetadata (user: UserProps, dropMetadata: DropMetadata): Promise<DropMetadata | undefined> {
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

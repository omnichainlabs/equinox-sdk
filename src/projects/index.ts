import {
  Project,
  UserProps
} from '../types.js'

export async function getAllProjects (user: UserProps): Promise<Project[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/projects`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to GET /projects')
    console.error(err)
  }
  return []
}

export async function getProject (user: UserProps, ProjectId: string): Promise<Project | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/projects/${ProjectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error(`Error occurred when trying to GET /projects/${ProjectId}`)
    console.error(err)
  }
}

export async function deleteProject (user: UserProps, ProjectId: string): Promise<void> {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/projects/${ProjectId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
  } catch (err) {
    console.error(`Error occurred when trying to DELETE /projects/${ProjectId}`)
    console.error(err)
  }
}

export async function postProject (user: UserProps, project: Project): Promise<Project | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/projects`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await response.json()
  } catch (err) {
    console.error('Error occurred when trying to POST /projects')
    console.error(err)
  }
}

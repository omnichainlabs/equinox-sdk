import { parseFetchResponse } from '../index.js'
import {
  Customer,
  EmailResponse,
  EmailTemplate,
  UserProps
} from '../types.js'

export async function getAllCustomers (user: UserProps, projectId: string): Promise<Customer[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/customers/${projectId}`, {
      headers: {
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error(`Error occurred when trying to GET /customers/${projectId}`)
    console.error(err)
  }
  return []
}

export async function deleteCustomer (user: UserProps, customer: Customer): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/customers`, {
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to DELETE /customers')
    console.error(err)
  }
}

export async function postCustomer (user: UserProps, customer: Customer): Promise<Customer | undefined> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/customers`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(customer),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to POST /customers')
    console.error(err)
  }
}

export async function postCustomerEmail ({
  user,
  customer,
  emailTemplate
}: {
  user: UserProps
  customer: Customer
  emailTemplate: EmailTemplate
}): Promise<EmailResponse | undefined> {
  try {
    if (customer.customerEmail === undefined) {
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BEANSTALK_SERVER_URL}/customers/email`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        ...customer,
        emailTemplate
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': user.apikey,
        'x-user-id': user.email
      }
    })
    return await parseFetchResponse(response)
  } catch (err) {
    console.error('Error occurred when trying to POST /customers/email')
    console.error(err)
  }
}

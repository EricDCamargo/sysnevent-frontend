'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { UserProps } from '@/types/user.type'

export async function getUserServer(): Promise<UserProps | null> {
  try {
    const token = await getCookieServer()
    if (!token) return null

    const response = await serviceConsumer(token).executeGet('/me')
    return response.data as UserProps
  } catch (error) {
    console.log(error)
    return null
  }
}
export async function getUsers(): Promise<UserProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/users')
    console.log(response.data)
    return response.data || []
  } catch (error) {
    console.log(error)
    return []
  }
}

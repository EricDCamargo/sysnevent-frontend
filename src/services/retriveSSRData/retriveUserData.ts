'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { UserProps } from '@/types/user.type'
import { getCookieServer } from '@/lib/cookieServer'

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
    const response = await serviceConsumer().executeGet('/users')
    return response.data || []
  } catch (error) {
    console.log(error)
    return []
  }
}

'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '../service.consumer'
import { CategoryProps } from '@/types/category.type'

export async function getCategories(): Promise<CategoryProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet(
      '/events/categories'
    )
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

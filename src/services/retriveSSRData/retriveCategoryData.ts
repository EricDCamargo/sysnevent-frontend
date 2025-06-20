'use server'

import { serviceConsumer } from '../service.consumer'
import { CategoryProps } from '@/types/category.type'

export async function getCategories(): Promise<CategoryProps[] | []> {
  try {
    const response = await serviceConsumer().executeGet('/events/categories')
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

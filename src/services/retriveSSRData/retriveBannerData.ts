'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '../service.consumer'
import { BannerProps } from '@/types/banner.type'

interface BannerRequestResponse {
  banners: BannerProps[]
  orderOptions: number[]
}

export async function getBanners(): Promise<BannerRequestResponse> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/events/banners')
    return response.data || []
  } catch (err) {
    console.log(err)
    return { banners: [], orderOptions: [] }
  }
}

//public route
export async function getActiveBanners(): Promise<BannerProps[] | []> {
  try {
    const response = await serviceConsumer().executeGet(
      '/events/banners/active'
    )
    return response.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}

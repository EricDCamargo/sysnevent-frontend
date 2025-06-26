import { getBanners } from '@/services/retriveSSRData/retriveBannerData'
import ManageBannersPage from './manageBannersPage'

export default async function ManageBanners() {
  const { banners, orderOptions } = await getBanners()
  return (
    <ManageBannersPage initialBanners={banners} avalibleOrder={orderOptions} />
  )
}

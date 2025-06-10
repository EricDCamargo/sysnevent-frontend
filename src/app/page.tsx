import { getUserServer } from '@/services/retriveSSRData/retriveUserData'
import Events from './(fatec)/(events)/page'
import FatecLayout from './(fatec)/layout'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUserServer()

  if (user) {
    redirect('/administration')
  }
  return (
    <FatecLayout>
      <Events />
    </FatecLayout>
  )
}

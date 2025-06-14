import Events from './(fatec)/(events)/page'
import FatecLayout from './(fatec)/layout'

export default async function Home() {
  return (
    <FatecLayout>
      <Events />
    </FatecLayout>
  )
}
export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { getUserServer } from '@/services/retriveSSRData/retriveUserData'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getUserServer()

  if (user) {
    redirect('/administration')
  }

  return <main>{children}</main>
}

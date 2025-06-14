import { Suspense } from 'react'
import styles from './fatec.module.css'
import ToastHandler from '@/lib/toastHandler'
import { Footer } from '../_components/footer'
import Loading from '../_components/loading/loading'
import { NavBar } from '../_components/navBar'
import { UserProvider } from '@/contexts/user'
export default async function FatecLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.grid}>
      <UserProvider>
        <NavBar />
        <div className={styles.content}>
          <Suspense fallback={<Loading />}>
            {children}
            <ToastHandler />
          </Suspense>
        </div>
        <Footer />
      </UserProvider>
    </main>
  )
}

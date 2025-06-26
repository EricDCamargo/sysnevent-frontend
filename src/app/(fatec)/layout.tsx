import { Suspense } from 'react'
import styles from './fatec.module.css'
import ToastHandler from '@/lib/toastHandler'
import { Footer } from '../_components/footer'
import Loading from '../_components/loading/loading'
import { NavBar } from '../_components/navBar'
import { UserProvider } from '@/contexts/user'
import { CategoryProvider } from '@/contexts/category'
import { BannerProvider } from '@/contexts/banner'
export default async function FatecLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className={styles.grid}>
      <UserProvider>
        <CategoryProvider>
          <BannerProvider>
            <NavBar />
            <div className={styles.content}>
              <Suspense fallback={<Loading />}>
                {children}
                <ToastHandler />
              </Suspense>
            </div>
            <Footer />
          </BannerProvider>
        </CategoryProvider>
      </UserProvider>
    </main>
  )
}

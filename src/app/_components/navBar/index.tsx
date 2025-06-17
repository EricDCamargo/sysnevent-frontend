import Link from 'next/link'
import { HeaderMenu } from '../headerMenu'
import Image from 'next/image'
import styles from './styles.module.css'
export function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image
            src="/logo_FatecItu.png"
            alt="Fatec"
            width={150}
            height={0}
            style={{ height: 'auto' }}
            priority={true}
            quality={100}
          />
        </Link>
        <HeaderMenu />
      </div>
    </nav>
  )
}

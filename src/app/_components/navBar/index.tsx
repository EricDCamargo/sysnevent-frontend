import Link from 'next/link'
import { HeaderMenu } from '../hamburguerMenu'
import Image from 'next/image'
import styles from './styles.module.css'
export function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image
            src="/logo_SysNevent.svg"
            alt="Fatec"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>

        <HeaderMenu />
      </div>
    </nav>
  )
}

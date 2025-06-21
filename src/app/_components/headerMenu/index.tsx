'use client'

import { UserContext } from '@/contexts/user'
import Link from 'next/link'
import { useContext, useState } from 'react'
import styles from './styles.module.css'
import { AlignJustify, LogOutIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '../button'

export const HeaderMenu = () => {
  const {
    loggedUser,
    handleLogout,
    determinatesActiveLink,
    filteredMenuItems
  } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()

  if (!loggedUser) return null

  const renderLogoutArea = () => (
    <form className={styles.form} action={handleLogout}>
      <p className={styles.text}>{loggedUser?.name}</p>
      <Button className={styles.button} type="submit">
        <LogOutIcon size={24} />
      </Button>
    </form>
  )

  return (
    <>
      <div className={styles.hamburguerMenuArea}>
        <AlignJustify
          color="black"
          size={22}
          aria-label="Abrir menu"
          onClick={() => setIsMenuOpen(state => !state)}
        />
        {isMenuOpen && (
          <div className={styles.hamburguerItems}>
            <div className={styles.hamburguerDetail} />
            {filteredMenuItems.map(({ href, subHref, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.section} ${
                  determinatesActiveLink(href, subHref) && styles.active
                }`}
              >
                <Icon />
                <p>{label}</p>
              </Link>
            ))}

            {renderLogoutArea()}
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        {filteredMenuItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.link} ${pathname === href && styles.active}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <nav className={styles.nav} role="navigation" aria-label="Logout">
        {renderLogoutArea()}
      </nav>
    </>
  )
}

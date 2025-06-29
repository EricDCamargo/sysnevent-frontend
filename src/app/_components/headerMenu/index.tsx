'use client'

import { UserContext } from '@/contexts/user'
import Link from 'next/link'
import { useContext, useState, MouseEvent } from 'react'
import styles from './styles.module.css'
import {
  AlignJustify,
  LogOutIcon,
  LogIn,
  CalendarDays,
  Info
} from 'lucide-react'
import { Button } from '../button'
import { usePathname, useRouter } from 'next/navigation'

export const HeaderMenu = () => {
  const {
    loggedUser,
    handleLogout,
    determinatesActiveLink,
    filteredMenuItems
  } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()

  const renderPrivateMenu = () => {
    const renderLogoutArea = () => (
      <form className={styles.form} action={handleLogout}>
        <p className={styles.text}>
          {loggedUser?.name
            ?.split(' ')
            .filter(Boolean)
            .filter((_, i, arr) => i === 0 || i === arr.length - 1)
            .join(' ')}
        </p>
        <Button className={styles.button} type="submit" aria-label="Sair">
          <LogOutIcon size={24} />
        </Button>
      </form>
    )

    return (
      <>
        {/* --- Menu Desktop Privado --- */}
        <nav className={styles.nav}>
          {filteredMenuItems.map(({ href, subHref, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${
                determinatesActiveLink(href, subHref) && styles.active
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.logoutAreaDesktop}>{renderLogoutArea()}</div>

        {/* --- Menu Hambúrguer Privado --- */}
        <div className={styles.hamburguerMenuArea}>
          <AlignJustify
            color="black"
            size={22}
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen(state => !state)}
            role="button"
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
      </>
    )
  }

  const handleScrollToEvents = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (pathname === '/') {
      const eventsSection = document.getElementById('events-list')
      if (eventsSection) {
        eventsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      router.push('/?scrollTo=events-list')
    }
    setIsMenuOpen(false)
  }

  const renderPublicMenu = () => {
    return (
      <>
        {/* --- Menu Desktop Público --- */}
        <div className={styles.publicHeader}>
          <p className={styles.tagline}>Plataforma de Eventos Acadêmicos</p>
          <div className={styles.publicActions}>
            <Link
              href="/teamPage"
              className={`${styles.ctaButton} ${styles.primary}`}
            >
              Sobre nós
            </Link>
            <Link
              href="/#events-list"
              onClick={handleScrollToEvents}
              className={`${styles.ctaButton} ${styles.primary}`}
            >
              Ver Eventos
            </Link>
            <Link
              href="/auth/signin"
              className={`${styles.ctaButton} ${styles.secondary}`}
            >
              Login
            </Link>
          </div>
        </div>

        {/* --- Menu Hambúrguer Público --- */}
        <div className={styles.hamburguerMenuArea}>
          <AlignJustify
            color="black"
            size={22}
            aria-label="Abrir menu"
            onClick={() => setIsMenuOpen(state => !state)}
            role="button"
          />
          {isMenuOpen && (
            <div className={styles.hamburguerItems}>
              <div className={styles.hamburguerDetail} />
              <Link
                href="/teamPage"
                onClick={() => setIsMenuOpen(false)}
                className={styles.section}
              >
                <Info />
                <p>Sobre nós</p>
              </Link>
              <Link
                href="#events-list"
                onClick={handleScrollToEvents}
                className={styles.section}
              >
                <CalendarDays />
                <p>Ver Eventos</p>
              </Link>

              <Link
                href="/auth/signin"
                onClick={() => setIsMenuOpen(false)}
                className={styles.section}
              >
                <LogIn />
                <p>Login</p>
              </Link>
            </div>
          )}
        </div>
      </>
    )
  }

  return loggedUser ? renderPrivateMenu() : renderPublicMenu()
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './styles.module.css'
import clsx from 'clsx'

interface Props {
  eventId: string
}

export default function TabsNav({ eventId }: Props) {
  const path = usePathname()

  const base = `/administration/events/${eventId}`
  const isNew = eventId === 'newEvent'

  return (
    <main className={styles.navContainer}>
      <h1>{isNew ? 'Criar um Evento' : 'Gerenciar Evento'}</h1>
      <nav className={styles.navbarLink}>
        <Link href={base} className={clsx({ [styles.active]: path === base })}>
          Informações
        </Link>

        {!isNew && (
          <Link
            href={`${base}/participants`}
            className={clsx({
              [styles.active]: path === `${base}/participants`
            })}
          >
            Participantes
          </Link>
        )}
      </nav>
    </main>
  )
}

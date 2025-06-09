'use client'
import styles from './styles.module.css'

interface Events {
  id: string
}

interface ManageEventsPage {
  initialEvents: Events[]
}

export default function ManageEventsPage({ initialEvents }: ManageEventsPage) {
  return (
    <main className={styles.container}>
      <h1>Rota privada de eventos</h1>
    </main>
  )
}

'use client'
import styles from './styles.module.css'

interface Events {
  id: string
}

interface EventsPage {
  initialEvents: Events[]
  currentEventId: string
}

export default function DetailEventsPage({
  initialEvents,
  currentEventId
}: EventsPage) {
  return (
    <main className={styles.container}>
      <h1> Essa é a pagina publica de detalhes do evento {currentEventId} </h1>
    </main>
  )
}

//Essa pagina alterna entre duas childrens via useState (Informações e Participantes )

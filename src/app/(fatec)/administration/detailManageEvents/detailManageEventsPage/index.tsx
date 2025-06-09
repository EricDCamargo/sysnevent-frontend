'use client'
import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'

interface EventsPage {
  event: EventProps | null
  currentEventId: string
}

export default function DetailManageEventsPage({
  event,
  currentEventId
}: EventsPage) {
  return (
    <main className={styles.container}>
      <h1>Rota privada de detalhes do evento - {currentEventId} </h1>

      <EventCard event={event!} />
    </main>
  )
}

//Essa pagina alterna entre duas childrens via useState (Informações e Participantes )

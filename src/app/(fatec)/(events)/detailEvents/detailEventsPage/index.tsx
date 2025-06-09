'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'

interface EventsPage {
  event: EventProps | null
  currentEventId: string
}

export default function DetailEventsPage({
  event,
  currentEventId
}: EventsPage) {
  return (
    <main className={styles.container}>
      {event ? (
        <>
          <h1>Rota privada de detalhes do evento - {currentEventId} </h1>

          <EventCard event={event!} />
        </>
      ) : (
        <h1>Evento não exitente</h1>
      )}
    </main>
  )
}

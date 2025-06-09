'use client'
import EventCard from '@/app/_components/EventCard/EventCard'
import styles from './styles.module.css'
import { EventProps } from '@/types/event.type'

interface ManageEventsPage {
  initialEvents: EventProps[]
}

export default function ManageEventsPage({ initialEvents }: ManageEventsPage) {
  return (
    <section className={styles.container}>
      <h1>Rota privada de eventos</h1>

      <div className={styles.eventsGrid}>
        {initialEvents.map((event: EventProps, index: number) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </section>
  )
}

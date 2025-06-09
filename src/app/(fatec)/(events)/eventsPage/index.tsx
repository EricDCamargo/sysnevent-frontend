'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'
import { useRouter } from 'next/navigation'
interface EventsPageProps {
  initialEvents: EventProps[]
}

export default function EventsPage({ initialEvents }: EventsPageProps) {
  const router = useRouter()
  const handleDetailManageEvent = (event: EventProps) => {
    router.push(`/detailEvents/${event.id}`)
  }
  return (
    <section className={styles.container}>
      <h1>Essa é a pagina publica de eventos</h1>

      <div className={styles.eventsGrid}>
        {initialEvents.map((event: EventProps, index: number) => (
          <EventCard
            key={index}
            event={event}
            onClick={() => handleDetailManageEvent(event)}
          />
        ))}
      </div>
    </section>
  )
}

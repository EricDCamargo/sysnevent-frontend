'use client'
import EventCard from '@/app/_components/EventCard/EventCard'
import styles from './styles.module.css'
import { EventProps } from '@/types/event.type'
import { useRouter } from 'next/navigation'

interface ManageEventsPage {
  initialEvents: EventProps[]
}

export default function ManageEventsPage({ initialEvents }: ManageEventsPage) {
  const router = useRouter()
  const handleDetailManageEvent = (event: EventProps) => {
    router.push(`/administration/detailManageEvents/${event.id}`)
  }
  return (
    <section className={styles.container}>
      <h1>Rota privada de eventos</h1>

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

'use client'

import { EventProps } from '@/types/event.type'
import styles from './EventGrid.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'
import { useRouter } from 'next/navigation'

interface EventsGridProps {
  events: EventProps[]
  mode: 'admin' | 'public'
}

export default function EventsGrid({ events, mode }: EventsGridProps) {
  const router = useRouter()

  const handleCardClick = (event: EventProps) => {
    if (mode === 'admin') {
      router.push(`/administration/events/detailManageEvents/${event.id}`)
    } else {
      router.push(`/detailEvents/${event.id}`)
    }
  }

  return (
    <div className={styles.eventsGrid}>
      {events.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          onClick={() => handleCardClick(event)}
        />
      ))}
    </div>
  )
}

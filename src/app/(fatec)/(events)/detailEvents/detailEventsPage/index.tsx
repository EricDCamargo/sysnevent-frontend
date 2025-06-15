'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import Image from 'next/image'
import { formatEventDate } from '@/lib/helper'
import EventsGrid from '@/app/(fatec)/_components/eventsGrid/EventsGrid'
import { Button } from '@/app/_components/button'
import { CalendarDays, MapPin } from 'lucide-react'

interface EventsPage {
  event: EventProps | null
  events: EventProps[]
  currentEventId: string
}

export default function DetailEventsPage({
  event,
  events,
  currentEventId
}: EventsPage) {
  if (!event) return <p>Evento não encontrado.</p>

  const formattedDate = formatEventDate(
    event.startDate,
    event.startTime,
    event.endTime
  )
  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <Image
          src={'/event_placeholder.svg'}
          alt={`Imagem do evento ${event.name}`}
          width={800}
          height={400}
          className={styles.eventImage}
        />

        <section className={styles.eventDetails}>
          <h1 className={styles.eventTitle}>{event.name}</h1>
          <p className={styles.eventResponsible}>Por: {event.speakerName}</p>

          <div className={styles.eventInfo}>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Data e Hora</h2>
              <div className={styles.infoItem}>
                <CalendarDays size={20} />
                <span>{formattedDate}</span>
              </div>
            </div>
            <div className={styles.detailBlock}>
              <h2 className={styles.detailTitle}>Local do Evento</h2>
              <div className={styles.infoItem}>
                <MapPin size={20} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className={styles.detailBlock}>
            <h2 className={styles.detailTitle}>Descrição</h2>
            <p className={styles.eventDescription}>{event.description}</p>
          </div>

          <Button type={'button'} name="Inscreva-se" />
        </section>
      </section>
      <section className={styles.otherEventsSection}>
        <h2>Outros eventos que podem te interessar</h2>
        <EventsGrid events={events} mode="public" />
      </section>
    </main>
  )
}

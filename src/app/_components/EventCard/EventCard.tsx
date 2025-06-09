import { EventProps } from '@/types/event.type'
import moment from 'moment'
import styles from './EventCard.module.css'
import Image from 'next/image'
import { Button } from '../button'

export interface EventCardProps {
  event: EventProps
  onClick?: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        {event.category ? (
          <img src={'/cardPlaceholder.svg'} alt={event.name} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{event.name}</h3>
        <p className={styles.text}>
          Data: {moment(event.startDate).format('dddd - DD/MM/YY')}
        </p>
        <p className={styles.text}>
          Horário: {moment(event.startTime).format('HH:mm')}
        </p>
        <p className={styles.text}>
          Local: {event.customLocation || event.location}
        </p>
        <p className={styles.speaker}>{event.speakerName}</p>
      </div>
      <Button
        name="Ver mais"
        type="button"
        onClick={onClick}
        style={{ alignSelf: 'center' }}
      />
    </div>
  )
}

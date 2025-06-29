import { EventProps } from '@/types/event.type'
import moment from 'moment'
import styles from './EventCard.module.css'
import { Button } from '@/app/_components/button'
import 'moment/locale/pt-br'
moment.locale('pt-br')

export interface EventCardProps {
  event: EventProps
  onClick?: () => void
}

export default function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      className={`${styles.card} ${event.isRestricted && styles.restricted}`}
    >
      <div className={styles.image}>
        <img
          src={event.banner ? event.banner : '/event_placeholder.svg'}
          alt={event.name}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{event.name}</h3>
        <p className={styles.text}>
          Data: {moment.parseZone(event.startDate).format('dddd - DD/MM/YYYY')}
        </p>
        <p className={styles.text}>
          Horário: {moment.parseZone(event.startTime).format('HH:mm')}
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

'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchInput } from '@/app/_components/searchInput'
interface EventsPageProps {
  initialEvents: EventProps[]
}

export default function EventsPage({ initialEvents }: EventsPageProps) {
  const router = useRouter()

  const [category, setCategory] = useState('Festas')
  const [filteredEvents, setFilteredEvents] = useState(initialEvents)
  const [searchValue, setSearchValue] = useState<EventProps[]>(filteredEvents)

  const handleDetailManageEvent = (event: EventProps) => {
    router.push(`/detailEvents/${event.id}`)
  }
  return (
    <section className={styles.container}>
      <SearchInput
        data={filteredEvents}
        searchValue="name"
        setDateToPage={setSearchValue}
      />
      <section className={styles.filters}>
        <div className={styles.categories}>
          {[
            'Festas',
            'Palestras',
            'Competições',
            'Reuniões',
            'Excursões',
            'Públicos'
          ].map(cat => (
            <button
              key={cat}
              className={`${styles.categoryButton} ${
                cat === category ? styles.active : ''
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.dateFilter}>
          <div>
            <label>De</label>
            <input type="date" />
          </div>

          <div>
            <span>a</span>
            <input type="date" />
          </div>
        </div>
      </section>

      <div className={styles.eventsGrid}>
        {searchValue.map((event: EventProps, index: number) => (
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

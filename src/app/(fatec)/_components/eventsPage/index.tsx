'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import EventCard from '@/app/_components/EventCard/EventCard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchInput } from '@/app/_components/searchInput'
import EventsGrid from '../eventsGrid/EventsGrid'

interface EventsPageProps {
  initialEvents: EventProps[]
  mode: 'admin' | 'public'
}

export default function EventsPage({ initialEvents, mode }: EventsPageProps) {
  const router = useRouter()
  const [category, setCategory] = useState('Festas')
  const [filteredEvents, setFilteredEvents] = useState(initialEvents)
  const [searchValue, setSearchValue] = useState<EventProps[]>(filteredEvents)

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
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
              <label>De -</label>
              <input type="date" />
            </div>

            <div>
              <span>Até-</span>
              <input type="date" />
            </div>
          </div>
        </section>
      </section>
      <EventsGrid events={searchValue} mode={mode} />
    </main>
  )
}

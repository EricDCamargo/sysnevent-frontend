'use client'

import EventCard from '@/app/_components/EventCard/EventCard'
import styles from './styles.module.css'
import { EventProps } from '@/types/event.type'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchInput } from '@/app/_components/searchInput'

interface ManageEventsPage {
  initialEvents: EventProps[]
}

export default function ManageEventsPage({ initialEvents }: ManageEventsPage) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Festas')

  const [filteredEvents, setFilteredEvents] = useState(initialEvents)
  const [searchValue, setSearchValue] = useState<EventProps[]>(filteredEvents)

  const handleDetailManageEvent = (event: EventProps) => {
    router.push(`/administration/detailManageEvents/${event.id}`)
  }
  return (
    <main className={styles.container}>
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
      <section className={styles.eventsList}>
        {searchValue.map((event: EventProps, index: number) => (
          <EventCard
            key={index}
            event={event}
            onClick={() => handleDetailManageEvent(event)}
          />
        ))}
      </section>
    </main>
  )
}

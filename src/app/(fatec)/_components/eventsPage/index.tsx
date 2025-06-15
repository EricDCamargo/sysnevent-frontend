'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchInput } from '@/app/(fatec)/_components/searchInput'
import EventsGrid from '../eventsGrid/EventsGrid'
import { Button } from '@/app/_components/button'

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
      {mode === 'admin' && <div className={styles.buttonContainer}>
       <Button onClick={() => router.push('/administration/events/createNewEvent')} type='button' name='Criar evento' />
      </div>}
       
      </section>
      
      <EventsGrid events={searchValue} mode={mode} />
    </main>
  )
}

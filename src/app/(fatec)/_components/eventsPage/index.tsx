'use client'

import { EventProps } from '@/types/event.type'
import styles from './styles.module.css'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { SearchInput } from '@/app/(fatec)/_components/searchInput'
import EventsGrid from '../eventsGrid/EventsGrid'
import { Button } from '@/app/_components/button'
import Carrossel from '@/app/_components/carrossel'
import { CategoryProps } from '@/types/category.type'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import { getCategoryOptions } from '@/utils'
import Loading from '@/app/_components/loading/loading'

interface EventsPageProps {
  initialEvents: EventProps[]
  categories: CategoryProps[]
  mode: 'admin' | 'public'
}

export default function EventsPage({
  initialEvents,
  categories,
  mode
}: EventsPageProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [currentEvents, setCurrentEvents] =
    useState<EventProps[]>(initialEvents)
  const [searchValue, setSearchValue] = useState<EventProps[]>(currentEvents)
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const isFirstRender = useRef(true)

  const fetchEvents = async () => {
    setLoading(true)
    const newEventList = await getEvents(selectedCategory, startDate, endDate)
    setCurrentEvents(newEventList)
    setSearchValue(newEventList)
    setLoading(false)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    fetchEvents()
  }, [selectedCategory, startDate, endDate])

  const optionsWithAll = [
    { label: 'Todos', value: '' },
    ...getCategoryOptions(categories)
  ]

  return (
    <main className={styles.container}>
      <section className={styles.wrapper}>
        <Carrossel />

        <SearchInput
          data={currentEvents}
          searchValue="name"
          setDateToPage={setSearchValue}
        />
        <section className={styles.filters}>
          <div className={styles.categories}>
            {optionsWithAll.map(cat => (
              <button
                key={cat.value}
                className={`${styles.categoryButton} ${
                  cat.value === selectedCategory && styles.active
                }`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className={styles.dateFilter}>
            <div>
              <label>De -</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <span>Até-</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </section>
        {mode === 'admin' && (
          <div className={styles.buttonContainer}>
            <Button
              onClick={() =>
                router.push(
                  '/administration/events/newEvent'
                )
              }
              type="button"
              name="Criar evento"
            />
          </div>
        )}
      </section>
      {loading ? <Loading /> : <EventsGrid events={searchValue} mode={mode} />}
    </main>
  )
}

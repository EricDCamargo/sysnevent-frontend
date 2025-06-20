import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import EventsPage from '../_components/eventsPage'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'

export default async function Administration() {
  const events = await getEvents()
  const categories = await getCategories()

  return (
    <EventsPage initialEvents={events} categories={categories} mode="admin" />
  )
}

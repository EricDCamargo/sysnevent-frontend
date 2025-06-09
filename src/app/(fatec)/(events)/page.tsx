import EventsPage from './eventsPage'
import { getEvents } from '@/services/retriveSSRData/retiveEventData'

export default async function Events() {
  const events = await getEvents()

  return <EventsPage initialEvents={events} />
}

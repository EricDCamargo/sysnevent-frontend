import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import EventsPage from './EventsPage'

export default async function Events() {
  const events = await getEvents()

  return <EventsPage initialEvents={events} />
}

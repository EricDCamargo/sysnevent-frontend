import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import EventsPage from '../_components/eventsPage'

export default async function Administration() {
  const events = await getEvents()
  return <EventsPage initialEvents={events} mode="admin" />
}

import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import EventsPage from './(events)/eventsPage'
export default async function FatecHome() {
  const events = await getEvents()
  return <EventsPage initialEvents={events} />
}

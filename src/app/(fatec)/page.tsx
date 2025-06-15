import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import EventsPage from './(events)/eventsPage'
import FatecLayout from './layout'

export default async function FatecHome() {
  const events = await getEvents()
  return (
    <FatecLayout>
      <EventsPage initialEvents={events} />
    </FatecLayout>
  )
}

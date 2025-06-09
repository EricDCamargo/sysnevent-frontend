import { getUserServer } from '@/services/retriveSSRData/retriveUserData'
import EventsPage from './eventsPage'
import { redirect } from 'next/navigation'

export default async function Events() {
  //const events = await getEvents()

  const events = 'oi'
  return <EventsPage events={events} />
}

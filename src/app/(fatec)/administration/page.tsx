import { getEvents } from '@/services/retriveSSRData/retiveEventData'
import ManageEventsPage from './events/manageEventsPage'

export default async function Administration() {
  const events = await getEvents()
  return <ManageEventsPage initialEvents={events} />
}

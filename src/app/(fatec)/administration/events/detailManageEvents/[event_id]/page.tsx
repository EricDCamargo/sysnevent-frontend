import {
  getEvents,
  handleDetailEvent
} from '@/services/retriveSSRData/retiveEventData'
import DetailManageEventsPage from '../detailManageEventsPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function DetailManageEvent({ params }: DetailEventsProps) {
  const { event_id } = await params

  const event = await handleDetailEvent(event_id)
  const events = await getEvents()

  return (
    <DetailManageEventsPage
      event={event}
      events={events}
      currentEventId={event_id}
    />
  )
}

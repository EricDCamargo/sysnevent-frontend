import { handleDetailEvent } from '@/services/retriveSSRData/retiveEventData'
import DetailEventsPage from '../detailEventsPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function DetailEvent({ params }: DetailEventsProps) {
  const { event_id } = await params
  const event = await handleDetailEvent(event_id)

  return <DetailEventsPage event={event} currentEventId={event_id} />
}

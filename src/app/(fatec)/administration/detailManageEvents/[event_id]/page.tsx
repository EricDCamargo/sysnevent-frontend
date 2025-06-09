import { handleDetailEvent } from '@/services/retriveSSRData/retiveEventData'
import DetailManageEventsPage from '../detailManageEventsPage'
import { EventProps } from '@/types/event.type'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function DetailManageEvent({ params }: DetailEventsProps) {
  const { event_id } = await params

  const event = await handleDetailEvent(event_id)

  return <DetailManageEventsPage event={event} currentEventId={event_id} />
}

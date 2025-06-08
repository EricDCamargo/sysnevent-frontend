import DetailEventsPage from '../detailEventsPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

interface Events {
  id: string
}
export default async function DetailEvent({ params }: DetailEventsProps) {
  const { event_id } = await params
  // const currentEvents: Events[] = await handleDetailEvents(event_id)
  const currentEvents: Events[] = []

  return (
    <DetailEventsPage initialEvents={currentEvents} currentEventId={event_id} />
  )
}

import DetailManageEventsPage from '../detailManageEventsPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

interface Events {
  id: string
}
export default async function DetailManageEvent({ params }: DetailEventsProps) {
  const { event_id } = await params
  // const currentEvents: Events[] = await handleDetailEvents(event_id)
  const currentEvents: Events[] = []

  return (
    <DetailManageEventsPage
      initialEvents={currentEvents}
      currentEventId={event_id}
    />
  )
}

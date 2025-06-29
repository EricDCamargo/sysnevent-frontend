import { getParticipants } from '@/services/retriveSSRData/retriveParticipantsData'
import EventParticipantsPage from '../../_components/eventParticipantsPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function EventParticipants({ params }: DetailEventsProps) {
  const { event_id } = await params

  const participants = await getParticipants(event_id)

  return (
    <EventParticipantsPage
      initialParticipants={participants}
      event_id={event_id}
    />
  )
}

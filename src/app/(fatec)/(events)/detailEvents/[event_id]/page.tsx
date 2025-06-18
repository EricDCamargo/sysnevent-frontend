import {
  getEvents,
  handleDetailEvent
} from '@/services/retriveSSRData/retiveEventData'
import DetailEventsPage from '../detailEventsPage'
import { Suspense } from 'react'
import Loading from '@/app/_components/loading/loading'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function DetailEvent({ params }: DetailEventsProps) {
  const { event_id } = await params
  const event = await handleDetailEvent(event_id)
  const events = await getEvents()

  return (
    <DetailEventsPage event={event} events={events} currentEventId={event_id} />
  )
}

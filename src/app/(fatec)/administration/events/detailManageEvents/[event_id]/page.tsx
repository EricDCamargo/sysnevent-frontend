import {
  getEvents,
  handleDetailEvent
} from '@/services/retriveSSRData/retiveEventData'
import DetailManageEventsPage from '../detailManageEventsPage'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function DetailManageEvent({ params }: DetailEventsProps) {
  const { event_id } = await params

  const event = event_id === 'newEvent' ? null : await handleDetailEvent(event_id)
  const categories = await getCategories();
  return (
    <DetailManageEventsPage
      typeOfForm={event ? 'edit': 'create'}
      event={event}
      categories={categories}
    />
  )
}
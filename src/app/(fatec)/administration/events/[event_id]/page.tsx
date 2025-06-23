import { handleDetailEvent } from '@/services/retriveSSRData/retiveEventData'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import EventInfoPage from '../_components/eventInfoPage'

interface DetailEventsProps {
  params: Promise<{
    event_id: string
  }>
}

export default async function EventInfo({ params }: DetailEventsProps) {
  const { event_id } = await params

  const event =
    event_id === 'newEvent' ? null : await handleDetailEvent(event_id)
  const categories = await getCategories()
  return (
    <EventInfoPage
      typeOfForm={event ? 'edit' : 'create'}
      event={event}
      categories={categories}
    />
  )
}

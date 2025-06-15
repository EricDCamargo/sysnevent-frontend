export const dynamic = 'force-dynamic'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import CreateNewEventPage from './createNewEventPage'

export default async function CreateNewEvent() {
  const categories = await getCategories()
  return <CreateNewEventPage categories={categories} />
}
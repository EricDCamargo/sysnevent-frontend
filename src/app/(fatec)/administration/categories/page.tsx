export const dynamic = 'force-dynamic'
import { getCategories } from '@/services/retriveSSRData/retriveCategoryData'
import ManageCategoriesPage from './manageCategoriesPage'

export default async function ManageCategories() {
  const categories = await getCategories()
  return <ManageCategoriesPage categories={categories} />
}

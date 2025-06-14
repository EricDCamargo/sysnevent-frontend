export const dynamic = 'force-dynamic'
import { getUsers } from '@/services/retriveSSRData/retriveUserData'
import ManageUsersPage from './manageUsersPage'

export default async function ManageUsers() {
  const users = await getUsers()
  return <ManageUsersPage users={users} />
}

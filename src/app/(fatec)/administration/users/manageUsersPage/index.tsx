import { UserProps } from '@/types/user.type'

interface ManageUsersPageProps {
  users: UserProps[]
}

export default function ManageUsersPage({ users }: ManageUsersPageProps) {
  return (
    <main>
      <h1>Pagina de gerenciamento de usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </main>
  )
}

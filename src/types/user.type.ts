import { UserRole } from '@/utils/enums'

export interface UserProps {
  id: string
  name: string
  email: string
  role: UserRole
  password?: string
  created_at: string
  updated_at: string
}

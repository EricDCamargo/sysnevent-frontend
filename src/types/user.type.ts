export interface UserProps {
  id: string
  name: string
  email: string
  role: UserRole
  password?: string
  created_at: string
  updated_at: string
}
export enum UserRole {
  DOCENT_ASSISTANT = 'DOCENT_ASSISTANT',
  COORDINATOR = 'COORDINATOR',
  ADMIN = 'ADMIN'
}

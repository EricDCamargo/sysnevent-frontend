import { Course, Semester } from '@/utils/enums'

export interface ParticipantProps {
  id: string
  eventId: string
  name: string
  email: string
  course?: Course
  semester?: Semester
  ra?: string
  isPresent: boolean
  createdAt: string
  updatedAt: string
}

import { Category, Course, Semester, Location } from '@/utils/enums'

export interface EventProps {
  id: string
  name: string
  category: Category
  course: Course
  semester?: Semester
  maxParticipants: number
  currentParticipants: number
  location: Location
  customLocation?: string
  speakerName: string
  startDate: string // ISO string (Date.toISOString())
  startTime: string // ISO string
  endTime: string // ISO string
  description: string
  isRestricted: boolean
  created_at: string
  updated_at: string
}

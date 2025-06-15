import { Category, Course, Semester, Location } from '@/utils/enums'
import { CategoryProps } from './category.type'

export interface EventProps {
  id: string
  name: string
  categoryId: string
  category: CategoryProps
  course: Course
  semester?: Semester
  maxParticipants: number
  currentParticipants: number
  location: Location
  customLocation?: string
  speakerName: string
  startDate: string 
  startTime: string 
  endTime: string 
  description: string
  isRestricted: boolean,
  banner: string
  duration?: number
  created_at: string
  updated_at: string
}

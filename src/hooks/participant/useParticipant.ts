'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { StatusCodes } from 'http-status-codes'

interface ParticipantResponse {
  message: string
  isOk: boolean
  status: number
  data?: any
}

const DEFAULT_SERVER_ERROR: ParticipantResponse = {
  message: 'Erro. Tente novamente mais tarde!',
  isOk: false,
  status: StatusCodes.INTERNAL_SERVER_ERROR
}

async function handleRegisterParticipant(
  formData: FormData
): Promise<ParticipantResponse> {
  const eventId = formData.get('eventId')
  const name = formData.get('name')
  const email = formData.get('email')
  const course = formData.get('course')
  const semester = formData.get('semester')
  const ra = formData.get('ra')

  try {
    const response = await serviceConsumer().executePost('/participants', {
      eventId,
      name,
      email,
      course,
      semester,
      ra
    })

    const { data, ...rest } = response
    return rest
  } catch (err) {
    return DEFAULT_SERVER_ERROR
  }
}

export { handleRegisterParticipant }

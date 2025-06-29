'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { ParticipantProps } from '@/types/participant.type'

interface GetParticipantsParams {
  event_id: string
  onlyStudents?: boolean
  onlyFatec?: boolean
  onlyExternal?: boolean
}

async function getParticipants(
  event_id: string
): Promise<ParticipantProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/participants', {
      event_id
    })

    return response.data || []
  } catch (error) {
    console.log(error)
    return []
  }
}

async function getParticipantsFiltered({
  event_id,
  onlyStudents = false,
  onlyFatec = false,
  onlyExternal = false
}: GetParticipantsParams): Promise<ParticipantProps[] | []> {
  try {
    const token = await getCookieServer()

    const response = await serviceConsumer(token).executeGet(
      '/participants/filtered',
      {
        event_id,
        onlyStudents,
        onlyFatec,
        onlyExternal
      }
    )

    return response.data || []
  } catch (error) {
    console.error('Erro ao buscar participantes filtrados:', error)
    return []
  }
}

export { getParticipants, getParticipantsFiltered }

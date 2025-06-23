'use server'

import { getCookieServer } from '@/lib/cookieServer'
import { serviceConsumer } from '@/services/service.consumer'
import { ParticipantProps } from '@/types/participant.type'

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

export { getParticipants }

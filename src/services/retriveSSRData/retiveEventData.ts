'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { getCookieServer } from '@/lib/cookieServer'
import { EventProps } from '@/types/event.type'

async function handleDetailEvent(event_id: string): Promise<EventProps | null> {
  try {
    const token = await getCookieServer()
    if (!token) return null

    const response = await serviceConsumer(token).executeGet('/events', {
      event_id
    })
    return response.data as EventProps
  } catch (error) {
    console.log(error)
    return null
  }
}
async function getEvents(): Promise<EventProps[] | []> {
  try {
    const response = await serviceConsumer().executeGet('/events')
    return response.data || []
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getEvents, handleDetailEvent }

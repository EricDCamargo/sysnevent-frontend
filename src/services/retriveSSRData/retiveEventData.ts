'use server'

import { serviceConsumer } from '@/services/service.consumer'
import { getCookieServer } from '@/lib/cookieServer'
import { EventProps } from '@/types/event.type'

async function handleDetailEvent(event_id: string): Promise<EventProps | null> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet(
      '/events/details',
      {
        event_id
      }
    )
    if (!response.isOk) return null
    return response.data as EventProps
  } catch (error) {
    return null
  }
}
async function getEvents(
  categoryId?: string,
  startDate?: string,
  endDate?: string
): Promise<EventProps[] | []> {
  try {
    const token = await getCookieServer()
    const response = await serviceConsumer(token).executeGet('/events', {
      categoryId,
      startDate,
      endDate
    })
    return response.data || []
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getEvents, handleDetailEvent }

import moment from 'moment'

const MIN_SLOT_MINUTES = Number(process.env.NEXT_PUBLIC_MIN_SLOT_MINUTES) || 20

function generateValidStartTimes(
  slots: { start: string; end: string }[]
): string[] {
  const result: string[] = []

  slots.forEach(({ start, end }) => {
    let cur = moment(start, 'HH:mm')
    const latestStart = moment(end, 'HH:mm').subtract(
      MIN_SLOT_MINUTES,
      'minutes'
    )

    while (cur.isSameOrBefore(latestStart)) {
      result.push(cur.format('HH:mm'))
      cur.add(15, 'minute')
    }
  })

  return result
}
function generateValidEndTimes(
  startTime: string,
  slots: { start: string; end: string }[]
): string[] {
  const result: string[] = []
  const start = moment(startTime, 'HH:mm')
  const minEnd = start.clone().add(MIN_SLOT_MINUTES, 'minutes')

  const slot = slots.find(({ start: slotStartStr, end: slotEndStr }) => {
    const slotStart = moment(slotStartStr, 'HH:mm')
    const slotEnd = moment(slotEndStr, 'HH:mm')
    return start.isSameOrAfter(slotStart) && start.isBefore(slotEnd)
  })

  if (!slot) return result

  const endLimit = moment(slot.end, 'HH:mm')
  let cur = minEnd.clone()
  while (cur.isSameOrBefore(endLimit)) {
    result.push(cur.format('HH:mm'))
    cur.add(15, 'minute')
  }

  return result
}
function isTimeValid(
  time: moment.Moment | null,
  slots: { start: string; end: string }[],
  minSlotMinutes: number
): boolean {
  if (!time) return false

  return slots.some(({ start, end }) => {
    const s = moment(start, 'HH:mm')
    const e = moment(end, 'HH:mm').subtract(minSlotMinutes, 'minutes')
    return time.isSameOrAfter(s) && time.isSameOrBefore(e)
  })
}
export { generateValidStartTimes, generateValidEndTimes, isTimeValid }

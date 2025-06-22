import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

const formatEventDate = (
  startDate: string,
  startTime: string,
  endTime: string
) => {
  const day = moment.parseZone(startDate).format('dddd, D [de] MMMM [de] YYYY')
  const startHour = moment.parseZone(startTime).format('HH:mm') + 'h'
  const endHour = moment.parseZone(endTime).format('HH:mm') + 'h'

  return `${day} - ${startHour} às ${endHour}`
}

export { formatEventDate }

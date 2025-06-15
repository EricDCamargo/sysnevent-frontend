import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

const formatEventDate = (
  startDate: string,
  startTime: string,
  endTime: string
) => {
  const day = moment(startDate).format('dddd, D [de] MMMM [de] YYYY')
  const startHour = moment(startTime).format('HH:mm') + 'h'
  const endHour = moment(endTime).format('HH:mm') + 'h'

  return `${day} - ${startHour} às ${endHour}`
}

export { formatEventDate }

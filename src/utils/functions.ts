import { camelCase } from 'lodash'
import { LocationObject } from 'src/types/main'

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    )
  }
  return obj
}

export const printDate = (date: Date) => {
  let todayDate = new Date()
  let todayFormatted = formatDate(todayDate)
  let dateFormatted = formatDate(date)
  if (dateFormatted === todayFormatted) {
    return 'today'
  } else if (dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
    return 'yesterday'
  } else {
    return dateFormatted
  }
}

export const formatDate = (date: Date) => {
  let dayOfMonth = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return `${month}/${dayOfMonth}/${year}`
}

export const formatDateRides = (date: Date) => {
  let todayDate = formatDate(new Date())
  let dayOfMonth = date.getDate()
  let month = date.toLocaleString('en-US', { month: 'long' })
  let year = date.getFullYear()

  if (todayDate === formatDate(date)) {
    return 'Today'
  }

  return `${month} ${dayOfMonth}, ${year}`
}

export const formatMinutes = (min: string) => {
  return min.length == 1 ? `0${min}` : min
}

export const formatTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = formatMinutes(`${date.getMinutes()}`)
  return `${hours}:${minutes}`
}

export const printDatePreview = (date: Date) => {
  let todayDate = new Date()
  let todayFormatted = formatDate(todayDate)
  let dateFormatted = formatDate(date)
  if (dateFormatted === todayFormatted) {
    return formatMinutes(formatTime(date))
  } else if (dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
    return 'yesterday'
  } else {
    return dateFormatted
  }
}

export const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const combineCoordinates = (locations: Partial<LocationObject>[]) => {
  const stringLocations = locations.map((location) => `${location.longitude},${location.latitude}`)
  return stringLocations.join(';')
}

export const stringToCoordinates = (coords: string) => {
  return {
    latitude: Number(coords.split(',')[0]),
    longitude: Number(coords.split(',')[1]),
  }
}

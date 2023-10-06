import dayjs from 'dayjs'

export const dateStringToUnix = (dateString) => { // YYYY-MM-DD => Unix Timestamp (10 digits)
  return dayjs(dateString).unix()
}

export const unixToDateString = (timestamp) => { // Unix Timestamp (10 digits) => YYYY-MM-DD
  return dayjs.unix(timestamp).format('YYYY-MM-DD')
}

export const todayUnix = () => {
  return dayjs().unix()
}
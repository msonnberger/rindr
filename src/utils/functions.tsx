export const printDate = (date: Date) => {
    let todayDate = new Date()
    let todayFormatted = formatDate(todayDate)
    let dateFormatted = formatDate(date)
    if(dateFormatted === todayFormatted) {
        return "today"
    } else if(dateFormatted === formatDate(new Date(Date.now() - 86400000))) {
        return "yesterday"
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

export const formatMinutes = (min: string) => {
    return min.length == 1 ? `0${min}` : min
}

export const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = formatMinutes(`${date.getMinutes()}`)
    return `${hours}:${minutes}`
}
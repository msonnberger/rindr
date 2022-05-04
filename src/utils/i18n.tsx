export const convertRanking = (place: string) => {
  switch (place) {
    case '1':
      return 'first'
    case '2':
      return 'second'
    case '3':
      return 'third'
    default:
      return `${place}th`
  }
}

export const convertPlural = (count: number, word: string) => {
  return `${count} ${count === 1 ? word : `${word}s`}`
}

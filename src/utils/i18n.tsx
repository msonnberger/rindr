export const convertRanking = (ranking: number) => {
  const a = ranking % 10
  const b = ranking % 100

  if (a == 1 && b != 11) return ranking + 'st'
  if (a == 2 && b != 12) return ranking + 'nd'
  if (a == 3 && b != 13) return ranking + 'rd'
  return ranking + 'th'
}

export const convertPlural = (count: number, word: string) => {
  return `${count} ${count === 1 ? word : `${word}s`}`
}

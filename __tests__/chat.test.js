import {
  formatDate,
  formatMinutes,
  formatTime,
  printDate,
  printDatePreview,
} from '../src/utils/functions'

let date = new Date('April 15, 2022 23:15:00')
let today = new Date()
let yesterday = new Date(Date.now() - 86400000)

describe('testing formatMinutes()', () => {
  test('testing if 3 minutes prints "03"', () => {
    expect(formatMinutes('3')).toBe('03')
  })
  test('testing if 18 minutes prints "18"', () => {
    expect(formatMinutes('18')).toBe('18')
  })
})

test('testing formatTime()', () => {
  expect(formatTime(date)).toBe('23:15')
})

test('testing formatDate()', () => {
  expect(formatDate(date)).toBe('4/15/2022')
})

describe('testing printDatePreview()', () => {
  test('testing if a date of yesterday prints "yesterday"', () => {
    expect(printDatePreview(yesterday)).toBe('yesterday')
  })

  test('testing if a date of today prints "today"', () => {
    let time = formatTime(today)
    expect(printDatePreview(today)).toBe(time)
  })

  test('testing if "April 20, 2022 23:15:00" prints "4/20/2022"', () => {
    let time = formatTime(today)
    expect(printDatePreview(today)).toBe(time)
  })
})

describe('testing printDate()', () => {
  test('testing if a date of yesterday prints "yesterday"', () => {
    expect(printDate(yesterday)).toBe('yesterday')
  })
  test('testing if a date of today prints "today"', () => {
    expect(printDate(today)).toBe('today')
  })
  test('testing if "April 20, 2022 23:15:00" prints "4/15/2022" ', () => {
    expect(printDate(date)).toBe('4/15/2022')
  })
})

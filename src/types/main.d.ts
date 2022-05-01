export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  pictureUrl: string
  bio: string
  interests: string[]
  music: string
  latitude: number
  longitude: number
  department?: string
  carModel?: string
  carColor?: string
  availableSeats?: number
  savingsCo2?: number
  savingsEuro?: number
  thumbsUpCount?: number
  thumbsDownCount?: number
}

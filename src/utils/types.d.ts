export interface SetupProfileFormValues {
  picture: FileList
  location: string
  bio: string
  hasNoCar: boolean
  carModel: string | null
  carColor: string | null
  availableSeats: number | null
  interests: {
    tag: string
  }[]
  music: string
}

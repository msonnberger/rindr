export interface SetupProfileFormValues {
  picture: FileList
  location: string
  bio: string
  carModel: string
  carColor: string
  availableSeats: number
  interests: {
    tag: string
  }[]
  music: string
}

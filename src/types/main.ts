export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  pictureUrl: string
  bio: string
  interests: string[]
  music: string
  location: string
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

export interface SetupProfileFormValues {
  picture: FileList
  location: string
  longitude: number
  latitude: number
  bio: string
  hasNoCar: boolean
  carModel?: string
  carColor?: string
  availableSeats?: number
  interests?: {
    tag: string
  }[]
  music: string
}

export interface Channel {
  id: string
  users: string[]
  lastMessage?: Message
}

export interface Message {
  id: string
  content: string
  timestamp: string
  received: boolean
}

export declare type MessagesByDate = Record<string, Message[]>

export interface ChatPreviewType {
  channelId: string
  content: string
  timestamp: string
  otherUser: {
    firstName: string
    lastName: string
    pictureUrl: string | null
  }
}

export interface SupabaseLatestMessages {
  id: string
  content: string
  created_at: string
  sender_id: string
  sender_first_name: string
  sender_last_name: string
  sender_picture_url: string | null
  receiver_first_name: string
  receiver_last_name: string
  receiver_picture_url: string | null
  row_num: number
}

export interface SupabaseChatMessages {
  id: string
  content: string
  channel_id: string
  sender_id: string
  receiver_id: string
  created_at: string
}

export interface RideRequest {
  ride_id: string
  passenger_id: string
  status: 'declined' | 'pending' | 'accepted'
}

export const Campuses: Array<Location> = [
  { name: 'Campus Urstein', latitude: 47.72350695668047, longitude: 13.087123685074921 },
  { name: 'Campus Kuchl', latitude: 47.63056265693036, longitude: 13.15139572735022 },
  { name: 'Campus Salzburg/SALK', latitude: 47.80726340063991, longitude: 13.032867527354465 },
  { name: 'Campus Schwarzach', latitude: 47.32120150312281, longitude: 13.156957342687942 },
]

export interface Location {
  name: string
  latitude: number | undefined
  longitude: number | undefined
}

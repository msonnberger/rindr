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

export interface SupabaseUser {
  id: string
  email: string
  first_name: string
  last_name: string
  picture_url: string
  bio: string
  interests: string[]
  music: string
  location: string
  latitude: number
  longitude: number
  department?: string
  car_model?: string
  available_seats?: number
  savings_co2?: number
  savings_euro?: number
  thumbs_up_count?: number
  thumbs_down_count?: number
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
  latitude: number
  longitude: number
}

export interface SupabaseRide {
  id: string
  driver_id: string
  passenger_id: string
  start_latitude: number
  start_longitude: number
  start_location: string
  destination_latitude: number
  destination_longitude: number
  destination_location: string
  departure: string
  arrival: string
  duration: number
  threshold: number
}

export interface FindRideResponse {
  driver: SupabaseUser
  ride: SupabaseRide & { image_url: string }
}

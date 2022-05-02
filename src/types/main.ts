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
  carModel: string | null
  carColor: string | null
  availableSeats: number | null
  interests: {
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

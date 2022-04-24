export interface User {
  name: string
  id: string
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

export type MessagesByDate = Record<string, Message[]>

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

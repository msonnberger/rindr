import { Timestamp } from 'firebase/firestore'

export interface User {
  name: string
  id: string
}

export interface Channel {
  id: string
  users: string[]
}

export interface Message {
  id: string
  text: string
  from: string
  createdAt: Timestamp
  to: string
  channelId: string
}

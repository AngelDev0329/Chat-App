export type ConversationInfo = {
  users: string[]
  group?: {
    admins: string[]
    groupName: null | string
    groupImage: null | string
  }

  seen: {
    [key: string]: string
  }
  updatedAt: {
    seconds: number
    nanoseconds: number
  }
  theme: string
}

export interface SavedUser {
  uid: string
  email: string | null
  displayName: string
  photoURL: string
  phoneNumber: string | null
}

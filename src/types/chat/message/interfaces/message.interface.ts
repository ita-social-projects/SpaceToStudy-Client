import { CommonEntityFields, UserResponse, UserRole } from '~/types'

export interface MessageInterface extends CommonEntityFields {
  author: Pick<UserResponse, '_id' | 'photo'>
  authorRole: UserRole
  text: string
  chat: string
  isRead: boolean
}

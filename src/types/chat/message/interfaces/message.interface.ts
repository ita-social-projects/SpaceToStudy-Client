import { UserResponse, UserRole } from '~/types'

export interface MessageInterface {
  _id: string
  author: UserResponse
  authorRole: UserRole
  messageContent: string
}

import { UserResponse } from '~/types'

export interface MessageInterface {
  _id: string
  author: UserResponse
  messageContent: string
}

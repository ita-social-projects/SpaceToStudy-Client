import { CommonEntityFields } from '~/types/common/common.index'
import { UserResponse } from '~/types/user/user.index'

export interface Member {
  user: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  role: UserResponse['role']
}

export interface LatestMessage extends CommonEntityFields {
  author: Pick<UserResponse, '_id' | 'firstName' | 'lastName'>
  authorRole: string
  text: string
  chat: string
}

export interface ChatResponse extends CommonEntityFields {
  members: Member[]
  latestMessage: LatestMessage
}

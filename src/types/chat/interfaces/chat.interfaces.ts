import { CommonEntityFields } from '~/types/common/common.index'
import { UserResponse } from '~/types/user/user.index'

export interface Member {
  _id: UserResponse['_id']
  firstName: UserResponse['firstName']
  lastName: UserResponse['lastName']
  photo: UserResponse['photo']
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

import { CommonEntityFields } from '~/types/common/common.index'
import { UserResponse } from '~/types/user/user.index'
import { UserRoleEnum } from '~/types'

export interface Member {
  user: Pick<
    UserResponse,
    '_id' | 'firstName' | 'lastName' | 'photo' | 'professionalSummary'
  >
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
  deletedFor: Member[]
  latestMessage: LatestMessage
}

export interface BasicChat {
  member: string
  memberRole: UserRoleEnum.Tutor | UserRoleEnum.Student | string
}

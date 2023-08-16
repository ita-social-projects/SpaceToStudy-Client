import { SxProps } from '@mui/material'
import {
  ChatResponse,
  CommonEntityFields,
  RequestParams,
  UserResponse,
  UserRole
} from '~/types'

export interface MessageInterface extends CommonEntityFields {
  author: Pick<UserResponse, '_id' | 'photo'>
  authorRole: UserRole
  text: string
  chat: string
  isRead: boolean
}

export interface GetMessagesParams
  extends Partial<Omit<RequestParams, 'sort'>> {
  chatId: Pick<ChatResponse, '_id'>
}

export interface TextAreaSx {
  textAreaWrapper?: SxProps
  container?: SxProps
  icon?: SxProps
}

export interface SendMessageParams {
  chatId: string
  text: string
}

export interface GroupedMessages {
  date: string
  messages: MessageInterface[]
}

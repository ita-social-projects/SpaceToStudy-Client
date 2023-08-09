import { CommonEntityFields, UserResponse } from '~/types'

export interface Attachment extends CommonEntityFields {
  author: Pick<UserResponse, '_id'>
  fileName: string
  link: string
  description: string
  size: number
}

export interface UpdateAttachmentParams {
  fileName: Attachment['fileName']
  id: Attachment['author']['_id']
}

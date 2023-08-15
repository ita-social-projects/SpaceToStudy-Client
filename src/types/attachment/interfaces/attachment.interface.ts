import { CommonEntityFields, UserResponse, RequestParams } from '~/types'

export interface Attachment extends CommonEntityFields {
  author: Pick<UserResponse, '_id'>
  fileName: string
  link: string
  description: string
  size: number
}

export interface GetAttachmentsParams extends RequestParams {
  title: string
}

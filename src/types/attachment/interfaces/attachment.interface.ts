import { CommonEntityFields, UserResponse, RequestParams } from '~/types'

export interface Attachment extends CommonEntityFields {
  author: string
  fileName: string
  link: string
  description: string
  size: number
}

export interface GetAttachmentsParams extends RequestParams {
  title: string
}

import { CommonEntityFields, RequestParams } from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  attachments: string[]
}

export interface GetLessonsParams extends RequestParams {
  title: string
}

export interface Attachment extends CommonEntityFields {
  author: string
  fileName: string
  link: string
  description: string
  size: number
}

export interface GetAttachmentsParams extends RequestParams {
  fileName: string
}

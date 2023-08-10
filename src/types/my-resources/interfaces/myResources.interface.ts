import { CommonEntityFields, RequestParams } from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  attachments: string[]
}

export interface GetLessonsParams extends RequestParams {
  title: string
}

export interface Attachment extends CommonEntityFields {
  fileName: string
  title: string
  size: number
}

export interface AttachmentsParams extends RequestParams {
  title: string
}

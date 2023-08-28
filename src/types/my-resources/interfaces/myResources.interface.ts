import { CommonEntityFields, RequestParams } from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  author: string
  description: string
  attachments: string[]
}

export interface GetLessonsParams extends RequestParams {
  title: string
}

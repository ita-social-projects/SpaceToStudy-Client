import { Attachment, CommonEntityFields, RequestParams } from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  author: string
  content: string
  description: string
  attachments: Attachment[]
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

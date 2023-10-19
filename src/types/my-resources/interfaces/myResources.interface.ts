import {
  Attachment,
  Category,
  CommonEntityFields,
  RequestParams
} from '~/types'

export interface Lesson extends CommonEntityFields {
  title: string
  author: string
  content: string
  description: string
  attachments: Attachment[]
  category: Category | null
}

export interface Categories extends CommonEntityFields {
  name: string
  author: string
}

export interface GetResourcesParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface UpdateResourceCategory {
  name: Categories['name']
  id: Categories['_id']
}

export interface GetResourcesCategoriesParams extends Partial<RequestParams> {
  name?: string
}

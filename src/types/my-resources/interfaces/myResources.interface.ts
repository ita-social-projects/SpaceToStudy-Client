import {
  Attachment,
  Category,
  CommonEntityFields,
  RequestParams,
  ResourceAvailability,
  ResourcesTabsEnum as ResourcesTypes
} from '~/types'

export interface ResourceBase {
  description: string
  resourceType: ResourcesTypes
  availability: ResourceAvailability
}

export interface Lesson extends CommonEntityFields, ResourceBase {
  title: string
  author: string
  content: string
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

export interface ResourceToolbarForm extends Pick<RequestParams, 'categories'> {
  name: string
  sortBy: string
}

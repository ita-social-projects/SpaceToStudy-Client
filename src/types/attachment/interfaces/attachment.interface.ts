import {
  CategoryNameInterface,
  CommonEntityFields,
  UserResponse,
  ResourceBase
} from '~/types'

export interface Attachment extends CommonEntityFields, ResourceBase {
  category: CategoryNameInterface | null
  author: Pick<UserResponse, '_id'>
  fileName: string
  link: string
  size: number
}

export interface UpdateAttachmentParams {
  fileName?: Attachment['fileName']
  id: Attachment['author']['_id']
  description?: Attachment['description']
  category: EditAttachmentForm['category']
}

export interface EditAttachmentForm {
  fileName: string
  category: string | null
  description: string
  fileExtension: string
}

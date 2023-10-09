import {
  CategoryNameInterface,
  CommonEntityFields,
  UserResponse
} from '~/types'

export interface Attachment extends CommonEntityFields {
  category: CategoryNameInterface | null
  author: Pick<UserResponse, '_id'>
  fileName: string
  link: string
  description?: string
  size: number
}

export interface UpdateAttachmentParams {
  fileName: Attachment['fileName']
  id: Attachment['author']['_id']
  description?: Attachment['description']
  category: EditAttachmentForm['category']
}

export interface EditAttachmentForm {
  fileName: string
  category: string | null
  description: string
}

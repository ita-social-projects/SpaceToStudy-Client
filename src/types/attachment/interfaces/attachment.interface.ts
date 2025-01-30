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

export interface CooperationSliceAttachment
  extends Omit<Attachment, 'category'> {
  category: string | null
}

export interface UpdateAttachmentData {
  fileName?: string
  description?: string
  category?: string | null
}

export interface UpdateAttachmentParams extends UpdateAttachmentData {
  id: string
}

export interface EditAttachmentForm {
  fileName: string
  category: string | null
  description: string
  fileExtension: string
}

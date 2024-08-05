import { emptyField } from '~/utils/validations/common'
import { ResourcesTypesEnum as ResourceType } from '~/types'

export const validations = {
  title: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.title' }),
  description: (value: string) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.description' })
}

export const initialValues = {
  title: '',
  description: '',
  content: '',
  attachments: [],
  category: null
}

export const defaultResponse = {
  attachments: [],
  author: '',
  createdAt: '',
  description: '',
  title: '',
  updatedAt: '',
  _id: '',
  content: '',
  category: null,
  resourceType: ResourceType.Lesson
}

export const myResourcesPath = '/my-resources'

import { emptyField } from '~/utils/validations/common'

export const validations = {
  title: (value: string | null) =>
    emptyField(value, 'newLesson.errorMessages.title'),
  description: (value: string) =>
    emptyField(value, 'newLesson.errorMessages.description')
}

export const initialValues = {
  title: '',
  description: '',
  attachments: []
}

export const defaultResponse = {
  attachments: [],
  author: '',
  createdAt: '',
  description: '',
  title: '',
  updatedAt: '',
  _id: ''
}

export const myResourcesPath = '/my-resources'

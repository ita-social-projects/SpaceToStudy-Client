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

export const myResourcesPath = '/my-resources'

export const initialFileValue = '<p>Create your file here.</p>'

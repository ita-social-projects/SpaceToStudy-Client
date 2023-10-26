import { emptyField } from '~/utils/validations/common'

export interface AddResourcesMenuItem {
  name: string
  handleClick: () => void
}

export const validations = {
  title: (value: string) => emptyField(value, 'course.errorMessages.title'),
  description: (value: string) =>
    emptyField(value, 'course.errorMessages.description')
}

export const initialValues = {
  title: '',
  description: '',
  resources: []
}

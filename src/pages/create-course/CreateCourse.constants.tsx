import { CourseSection } from '~/types'
import { emptyField, textField } from '~/utils/validations/common'

export const sectionInitialData: CourseSection = {
  id: '',
  title: '',
  description: '',
  resources: []
}

export const initialValues = {
  title: '',
  description: '',
  author: { _id: '' },
  category: null,
  subject: null,
  proficiencyLevel: [],
  sections: []
}

export const defaultResponse = {
  _id: '',
  title: '',
  description: '',
  author: { _id: '' },
  category: null,
  subject: null,
  sections: [],
  proficiencyLevel: [],
  createdAt: '',
  updatedAt: ''
}

export const validations = {
  title: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.title',
      helperText: textField(0, 100)(value)
    }),
  description: (value: string) =>
    emptyField({
      value,
      emptyMessage: 'common.errorMessages.description',
      helperText: textField(20, 1000)(value)
    }),
  category: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.category' }),
  subject: (value: string | null) =>
    emptyField({ value, emptyMessage: 'common.errorMessages.subject' }),
  proficiencyLevel: (value: string[] | string) =>
    emptyField({
      value: value?.toString(),
      emptyMessage: 'common.errorMessages.proficiencyLevel'
    })
}

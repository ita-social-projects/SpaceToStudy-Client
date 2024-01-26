import { emptyField, textField } from '~/utils/validations/common'

export const sectionInitialData = {
  id: '',
  title: '',
  description: '',
  lessons: [],
  quizzes: [],
  attachments: [],
  order: []
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
    emptyField(value, 'common.errorMessages.title', textField(0, 100)(value)),
  description: (value: string) =>
    emptyField(
      value,
      'common.errorMessages.description',
      textField(20, 1000)(value)
    ),
  category: (value: string | null) =>
    emptyField(value, 'common.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'common.errorMessages.subject'),
  proficiencyLevel: (value: string[] | string) =>
    emptyField(value?.toString(), 'common.errorMessages.proficiencyLevel')
}

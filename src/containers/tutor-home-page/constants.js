import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  confirmAge: false,
  languages: [{ language: null, level: null }],
  experience: '',
  photo: []
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  country: nameField,
  city: nameField,
  experience: textField(200, 1000)
}

export const stepLabels = ['generalInfo', 'languages', 'studyCategory', 'experience', 'documents', 'photoAndVideo']

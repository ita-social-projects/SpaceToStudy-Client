import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  experience: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  experience: textField(0, 200)
}

export const stepLabels = ['generalInfo', 'subjects', 'languages', 'photo']

import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  confirmAge: false,
  experience: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  experience: textField(30, 200)
}

export const stepLabels = ['generalInfo', 'subjects', 'languages', 'photo']

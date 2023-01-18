import { nameField, textField, selectField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  confirmAge: false,
  experience: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  country: selectField,
  city: selectField,
  experience: textField(30, 200)
}

export const stepLabels = ['generalInfo', 'subjects', 'languages', 'photo']

import { nameField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  confirmAge: false,
  photo: []
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  country: nameField,
  city: nameField
}

export const stepLabels = ['generalInfo', 'tutoringCategory', 'languages', 'photo']

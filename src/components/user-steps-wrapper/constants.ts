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
  experience: textField(0, 70)
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']
export const studentStepLabels = [
  'generalInfo',
  'interests',
  'language',
  'photo'
]

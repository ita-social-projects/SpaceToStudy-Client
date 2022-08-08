import { nameField } from '~/constants/validation/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  confirmAge: false
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  country: nameField,
  city: nameField
}

export const stepLabels = [
  'General info', 
  'Languages', 
  'Study category', 
  'Experience', 
  'Documents', 
  'Photo and Video'
]

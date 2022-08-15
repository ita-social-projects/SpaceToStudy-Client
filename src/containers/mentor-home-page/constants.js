import { nameField } from '~/utils/validations/common'
import { experienceField } from '~/utils/validations/experience'

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
  country: nameField,
  city: nameField,
  experience: experienceField
}

export const stepLabels = [
  {
    step: 'General info',
    fields: ['firstName', 'lastName', 'country', 'city', 'confirmAge']
  },
  {
    step: 'Languages'
  },
  {
    step: 'Study category'
  },
  {
    step: 'Experience',
    fields: ['experience']
  },
  {
    step: 'Documents'
  },
  {
    step: 'Photo and Video'
  }
]

import { nameField } from '~/constants/validation/common'
import { experienceField } from  '~/constants/validation/experience'

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
    fields: [
      'firstName',
      'lastName',
      'country',
      'city',
      'confirmAge'
    ]
  },
  {
    step: 'Languages',
    fields: []
  },
  {
    step: 'Study category',
    fields: []
  },
  {
    step: 'Experience',
    fields: ['experience']
  },
  {
    step: 'Documents',
    fields: []
  },
  {
    step: 'Photo and Video',
    fields: []
  }
]

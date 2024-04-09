import { UserGeneralInfo } from '~/types'
import {
  nameField,
  textField,
  youtubeVideoLink
} from '~/utils/validations/common'

export const initialValues: UserGeneralInfo = {
  firstName: '',
  lastName: '',
  country: null,
  city: null,
  professionalSummary: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 200),
  videoLink: youtubeVideoLink
}

export const tutorStepLabels = ['generalInfo', 'subjects', 'language', 'photo']
export const studentStepLabels = [
  'generalInfo',
  'interests',
  'language',
  'photo'
]

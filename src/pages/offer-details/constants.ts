import { UserRoleEnum } from '~/types'

export const defaultResponse = {
  _id: '',
  price: 0,
  proficiencyLevel: [],
  description: '',
  languages: [],
  authorRole: UserRoleEnum.Tutor,
  authorFirstName: '',
  authorLastName: '',
  authorAvgRating: 0,
  author: {
    _id: '',
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo: '',
    professionalSummary: ''
  },
  subject: {
    _id: '',
    name: ''
  },
  category: { _id: '' },
  createdAt: '',
  updatedAt: ''
}

import { UserRoleEnum } from '~/types'

export const userDataMock = {
  _id: 1,
  role: [UserRoleEnum.Tutor],
  firstName: '',
  lastName: '',
  mainSubjects: { student: [], tutor: [] },
  nativeLanguage: null,
  address: { country: null, city: null },
  photo: 'photo.png',
  videoLink: { student: '', tutor: '' }
}

export const formDataMock = {
  firstName: '',
  lastName: '',
  mainSubjects: [],
  nativeLanguage: null,
  country: null,
  city: null,
  photo: 'photo.png',
  videoLink: ''
}

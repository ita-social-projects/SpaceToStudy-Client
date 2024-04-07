import { UserResponse, UserRoleEnum } from '~/types'

export const getInitialValues = (user: UserResponse) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  address: {
    country: user.address?.country ?? null,
    city: user.address?.city ?? null
  },
  professionalSummary: user.professionalSummary ?? '',
  nativeLanguage: user.nativeLanguage ?? null,
  videoLink:
    user.role[0] !== UserRoleEnum.Admin ? user.videoLink[user.role[0]] : '',
  mainSubjects:
    user.role[0] !== UserRoleEnum.Admin ? user.mainSubjects[user.role[0]] : [],

  photo: {
    src: user.photo || '',
    name: ''
  }
})

import { UserResponse } from '~/types'

export const getInitialValues = (user: UserResponse) => ({
  firstName: user.firstName ?? '',
  lastName: user.lastName ?? '',
  country: user.address.country ?? null,
  city: user.address.city ?? null,
  professionalSummary: user.professionalSummary ?? '',
  nativeLanguage: user.nativeLanguage ?? null
})

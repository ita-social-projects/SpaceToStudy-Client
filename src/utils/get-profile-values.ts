import {
  EditProfileForm,
  UpdateUserParams,
  UserResponse,
  UserRoleEnum
} from '~/types'

export const getProfileInitialValues = (user: UserResponse) => ({
  firstName: user.firstName,
  lastName: user.lastName,
  address: {
    country: user.address?.country ?? null,
    city: user.address?.city ?? null
  },
  country: user.address?.country ?? null,
  city: user.address?.city ?? null,
  professionalSummary: user.professionalSummary ?? '',
  nativeLanguage: user.nativeLanguage ?? null,
  videoLink:
    user.role[0] !== UserRoleEnum.Admin
      ? user.videoLink?.[user.role[0]] || ''
      : '',
  photo: user.photo || { src: '', name: '' }
})

export const getUserUpdatedData = (data: EditProfileForm) => {
  const updatedData: UpdateUserParams = {
    firstName: data.firstName,
    lastName: data.lastName,
    address: {
      country: data.country ?? '',
      city: data.city ?? ''
    },
    professionalSummary: data.professionalSummary,
    nativeLanguage: data.nativeLanguage ?? null,
    videoLink: data.videoLink
  }

  const updatedPhoto =
    typeof data.photo !== 'string' &&
    (data.photo === null || Boolean(data.photo.src))
      ? data.photo
      : undefined

  if (updatedPhoto !== undefined) updatedData.photo = updatedPhoto

  return updatedData
}

import {
  EditProfileForm,
  UpdatedPhoto,
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
  mainSubjects:
    user.role[0] !== UserRoleEnum.Admin ? user.mainSubjects[user.role[0]] : []
})

export const getUserUpdatedData = (
  user: UserResponse,
  data: EditProfileForm,
  isPhotoChanged: boolean,
  photo: UpdatedPhoto | null
) => {
  const updatedData: UpdateUserParams = {
    firstName: data.firstName,
    lastName: data.lastName,
    address: {
      country: data.country ?? '',
      city: data.city ?? ''
    },
    professionalSummary: data.professionalSummary,
    mainSubjects:
      user.role[0] !== UserRoleEnum.Admin
        ? user.mainSubjects[user.role[0]]
        : [],
    nativeLanguage: data.nativeLanguage ?? null,
    videoLink: data.videoLink
  }

  if (isPhotoChanged) updatedData.photo = photo

  return updatedData
}

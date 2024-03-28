import { UserResponse } from '~/types/user/user.index'

export interface EditProfileForm
  extends Pick<UserResponse, 'firstName' | 'lastName'> {
  country: string | null
  city: string | null
  professionalSummary: string
  nativeLanguage: string | null
}

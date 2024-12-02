import { EditProfilePhoto } from '~/types'

export const isUpdatedPhoto = (photo: EditProfilePhoto): boolean => {
  return (
    photo !== null &&
    typeof photo === 'object' &&
    'name' in photo &&
    'src' in photo
  )
}

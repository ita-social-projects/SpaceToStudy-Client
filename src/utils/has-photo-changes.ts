import { EditProfilePhoto, UpdatedPhoto } from '~/types'
import { isUpdatedPhoto } from '~/utils/is-updated-photo'
import { areAllValuesEmptyStrings } from '~/utils/are-all-values-empty-strings'

export const hasPhotoChanges = (
  initialPhoto: EditProfilePhoto,
  currentPhoto: EditProfilePhoto
): boolean => {
  if (initialPhoto !== '' && currentPhoto === '') {
    return true
  }

  if (
    typeof initialPhoto === 'string' &&
    isUpdatedPhoto(currentPhoto) &&
    (currentPhoto as UpdatedPhoto).name !== initialPhoto
  ) {
    return true
  }

  if (
    initialPhoto === null &&
    isUpdatedPhoto(currentPhoto) &&
    areAllValuesEmptyStrings(currentPhoto as UpdatedPhoto)
  ) {
    return true
  }

  if (
    isUpdatedPhoto(initialPhoto) &&
    isUpdatedPhoto(currentPhoto) &&
    (initialPhoto as UpdatedPhoto).name !== (currentPhoto as UpdatedPhoto).name
  ) {
    return true
  }

  return false
}

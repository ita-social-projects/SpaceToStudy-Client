export const experienceField = (value) => {
  if (value.length !== 0 && value.length < 200) {
    return 'common.errorMessages.shortText'
  }
  if (value.length > 1000) {
    return 'common.errorMessages.longText'
  }
}

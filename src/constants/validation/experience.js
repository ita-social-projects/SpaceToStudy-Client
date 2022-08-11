export const experienceField = (value) => {
  let helperText
  if (value.length !== 0 && value.length < 200) {
    helperText = 'common.errorMessages.shortText'
  }
  if (value.length > 1000) {
    helperText = 'common.errorMessages.longText'
  }
  return helperText
}

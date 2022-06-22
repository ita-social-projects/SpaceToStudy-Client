export const emptyField = (value, helperText) => {
  if (!value) {
    return 'common.errorMessages.emptyField'
  }
  return helperText
}

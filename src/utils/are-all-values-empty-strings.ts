export const areAllValuesEmptyStrings = (obj: {
  [key: string]: string
}): boolean => {
  return Object.values(obj).every(
    (value) => typeof value === 'string' && value === ''
  )
}

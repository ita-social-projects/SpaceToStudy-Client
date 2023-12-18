export const getErrorMessage = (message: string) => {
  const errorsList = message
    .slice(message.indexOf(':') + 1)
    .trim()
    .split(',')
  const errorListWithoutDuplications = new Set(
    errorsList.map((error) => error.split(':')[1])
  )
  return Array.from(errorListWithoutDuplications).join(',')
}

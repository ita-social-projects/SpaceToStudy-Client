export const getErrorMessage = (message: string) => {
  return message.slice(message.indexOf(':') + 1).trim()
}

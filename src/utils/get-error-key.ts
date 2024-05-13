interface ErrorResponse {
  code: string
}

export const getErrorKey = (error?: ErrorResponse) =>
  `errors.${error && error.code ? error.code : 'UNKNOWN_ERROR'}`

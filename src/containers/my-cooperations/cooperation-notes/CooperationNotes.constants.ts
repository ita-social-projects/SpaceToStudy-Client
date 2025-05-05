import { ResponseError } from '~/exceptions'

export const noteNotFoundError = new ResponseError({
  message: 'Note not found',
  status: 404,
  code: 'NOTE_NOT_FOUND'
})

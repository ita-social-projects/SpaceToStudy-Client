import { expect } from 'vitest'
import { getErrorMessage } from '~/utils/error-with-message'

const mockedError = {
  code: 'VALIDATION_ERROR',
  message:
    'Course validation failed: title: The title field cannot be empty., description: The description field cannot be empty.',
  status: 409
}

const expectedMessage =
  ' The title field cannot be empty., The description field cannot be empty.'

describe('getErrorMessage', () => {
  it('Should return data about non-valid fields', () => {
    const resultMessage = getErrorMessage(mockedError.message)
    expect(resultMessage).toBe(expectedMessage)
  })
})

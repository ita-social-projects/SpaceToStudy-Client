import { waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import NewQuiz from '~/pages/new-quiz/NewQuiz'

describe('NewQuiz', () => {
  it('should render NewQuiz page', () => {
    renderWithProviders(<NewQuiz />)

    waitFor(() => expect('New Quiz').toBeTruthy())
  })
})

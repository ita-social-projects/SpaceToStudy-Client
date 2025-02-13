import { renderWithProviders } from '~tests/test-utils'

import NewQuiz from '~/pages/new-quiz/NewQuiz'

describe('NewQuiz', () => {
  it('should render NewQuiz page', () => {
    renderWithProviders(<NewQuiz />)

    expect('New Quiz').toBeTruthy()
  })
})

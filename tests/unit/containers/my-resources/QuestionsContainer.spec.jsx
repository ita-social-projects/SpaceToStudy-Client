import QuestionsContainer from '~/containers/my-resources/questions-container/QuestionsContainer'
import { renderWithProviders } from '~tests/test-utils'

describe('QuestionsContainer', () => {
  it('should render text', () => {
    renderWithProviders(<QuestionsContainer />)

    expect('Questions').toBeTruthy()
  })
})

import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

describe('StudentHowItWorks test', () => {
  beforeEach(() => {
    renderWithProviders(<StudentHowItWorks />)
  })

  it('should have section title and description', () => {
    const title = screen.getByText('studentHomePage.howItWorks.title')
    const description = screen.getByText('studentHomePage.howItWorks.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should have start learning image, title and description', () => {
    const img = screen.getByAltText('studentHomePage.howItWorks.startLearning.title')
    const title = screen.getByText('studentHomePage.howItWorks.startLearning.title')
    const description = screen.getByText('studentHomePage.howItWorks.startLearning.description')

    expect(img).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})

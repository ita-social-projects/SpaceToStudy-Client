import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

describe('StudentHowItWorks test', () => {
  beforeEach(() => {
    renderWithProviders(<StudentHowItWorks />)
  })

  it('should have section title and description', async () => {
    const title = screen.getByText('studentHomePage.howItWorks.title')
    const description = screen.getByText('studentHomePage.howItWorks.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should redirect to find tutor page when click on the find tutor button', async () => {
    const findTutorButton = screen.getByText('studentHomePage.findTutorBlock.button')
    fireEvent.click(findTutorButton)
    const findTutorText = screen.getByText(/FindTutor/i)

    expect(findTutorText).toBeInTheDocument()
  })

  it('should have start learning image, title and description', async () => {
    const img = screen.getByAltText('studentHomePage.howItWorks.startLearning.title')
    const title = screen.getByText('studentHomePage.howItWorks.startLearning.title')
    const description = screen.getByText('studentHomePage.howItWorks.startLearning.description')

    expect(img).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})

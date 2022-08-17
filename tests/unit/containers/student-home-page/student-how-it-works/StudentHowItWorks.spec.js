import { screen, fireEvent, render } from '@testing-library/react'
import StudentHowItWorks from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks'

const mockNavigate = jest.fn()

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('FindMentorBlock test', () => {
    beforeEach(() => {
      render(<StudentHowItWorks />)
    })

    it('should have section title and description', async () => {
        const title = screen.getByText('studentHomePage.howItWorks.title')
        const description = screen.getByText('studentHomePage.howItWorks.description')

        expect(title).toBeInTheDocument()
        expect(description).toBeInTheDocument()
      })

    it('should redirect to find mentor page when click on the find mentor button', async () => {
        const findMentorButton = screen.getByText('studentHomePage.findMentorBlock.button')
        fireEvent.click(findMentorButton)
    
        expect(mockNavigate).toHaveBeenCalled()
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
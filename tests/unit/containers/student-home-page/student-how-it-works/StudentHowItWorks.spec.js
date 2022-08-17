import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import StudentHowItWorks from "~/containers/student-home-page/student-how-it-works/StudentHowItWorks";

describe('FindMentorBlock test', () => {

    beforeEach(() => {
        renderWithProviders(<StudentHowItWorks />)
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
        const findMentorText = screen.getByText(/FindMentor/i)
    
        expect(findMentorText).toBeInTheDocument()
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
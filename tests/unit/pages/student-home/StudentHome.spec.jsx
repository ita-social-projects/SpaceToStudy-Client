import { screen, waitFor } from '@testing-library/react'

import StudentHome from '~/pages/student-home/StudentHome'

import { renderWithProviders } from '~tests/test-utils'

const userId = '63f5d0ebb'

const firstLoginState = {
  appMain: { isFirstLogin: true, userRole: 'student', userId }
}
const secondLoginState = {
  appMain: { isFirstLogin: false, userRole: 'student', userId }
}

describe('StudentsHome component', () => {
  it('should render modal when logging in for the first time', async () => {
    renderWithProviders(<StudentHome />, {
      preloadedState: firstLoginState
    })

    await waitFor(() =>
      expect(
        screen.getByText(/becomeTutor.generalInfo.title/i)
      ).toBeInTheDocument()
    )
  })

  it('should not render modal when logging in for the second time', () => {
    renderWithProviders(<StudentHome />, {
      preloadedState: secondLoginState
    })

    const firstStepTitle = screen.queryByText(/becomeTutor.generalInfo.title/i)
    const studentHomePage = screen.getByTestId('studentHome')

    expect(firstStepTitle).not.toBeInTheDocument()
    expect(studentHomePage).toBeInTheDocument()
  })
})

import { screen } from '@testing-library/react'

import StudentHome from '~/pages/student-home/StudentHome'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { beforeAll } from 'vitest'

const userId = '63f5d0ebb'

const firstLoginState = {
  appMain: { isFirstLogin: true, userRole: 'student', userId }
}
const secondLoginState = {
  appMain: { isFirstLogin: false, userRole: 'student', userId }
}

const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }

describe('StudentsHome component', () => {
  beforeAll(() => {
    mockAxiosClient
      .onGet(new RegExp(URLs.users.getUserById.replace(':id', userId)))
      .reply(200, userDataMock)
  })
  it('should render modal when logging in for the first time', async () => {
    renderWithProviders(<StudentHome />, {
      preloadedState: firstLoginState
    })

    const title = await screen.findByText(/becomeTutor.generalInfo.title/i)

    expect(title).toBeInTheDocument()
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

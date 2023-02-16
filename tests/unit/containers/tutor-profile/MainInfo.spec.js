import { screen, fireEvent } from '@testing-library/react'

import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'

import MainInfo from '~/containers/tutor-profile/main-info/MainInfo'

Object.assign(window.navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve())
  }
})

describe('MainInfo test with student role', () => {
  const preloadedState = { appMain: { userRole: 'student' } }
  beforeEach(() => {
    renderWithProviders(
      <SnackBarProvider>
        <MainInfo />
      </SnackBarProvider>,
      { preloadedState }
    )
  })

  it('should have buttons', async () => {
    const bookLessonBtn = screen.getByText(/tutorProfilePage.mainInfo.bookLesson/i)

    expect(bookLessonBtn).toBeInTheDocument()
  })

  it('should copy link to profile', async () => {
    const iconBtn = screen.getByTestId('icon-btn')

    fireEvent.click(iconBtn)

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
  })
})

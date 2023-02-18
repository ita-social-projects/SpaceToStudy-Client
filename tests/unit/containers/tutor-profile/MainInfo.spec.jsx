import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders } from '~tests/test-utils'

import MainInfo from '~/containers/tutor-profile/main-info/MainInfo'

Object.assign(window.navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve())
  }
})

describe('MainInfo test in my profile', () => {
  beforeEach(() => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useLocation: () => ({
          pathname: '/tutors/German/testUser'
        })
      }
    })
    renderWithProviders(
      <SnackBarProvider>
        <MainInfo />
      </SnackBarProvider>
    )
  })

  it('should copy link to profile', () => {
    const iconBtn = screen.getByTestId('icon-btn')

    fireEvent.click(iconBtn)

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled()
  })

  it('should render send message button', () => {
    const sendMessageBtn = screen.getByText(/tutorProfilePage.mainInfo.sendMessage/i)

    expect(sendMessageBtn).toBeInTheDocument()
  })
})

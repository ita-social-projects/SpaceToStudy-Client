import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useTranslation } from 'react-i18next'

import { setToLocalStorage } from '~/services/local-storage-service'
import { openAlert } from '~/redux/features/snackbarSlice'
import LanguageMenu from '~/containers/layout/language-menu/LanguageMenu'
import { languageMenuConstants } from '~/containers/layout/language-menu/LanguageMenu.constants'

const mockDispatch = vi.fn()
const mockChangeLanguage = vi.fn()
const mockHandleClose = vi.fn()
const mockOpenAlert = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}))

vi.mock('~/services/local-storage-service', () => ({
  setToLocalStorage: vi.fn()
}))

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch
  }
})

vi.mock('~/context/snackbar-context', async () => {
  const actual = await vi.importActual('~/context/snackbar-context')
  return {
    openAlert: () => mockOpenAlert(),
    ...actual
  }
})

describe('LanguageMenu', () => {
  const anchorEl = document.createElement('div')

  beforeEach(() => {
    useTranslation.mockReturnValue({
      t: (str) => str,
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render menu items', () => {
    mockChangeLanguage.mockResolvedValue(null)

    render(<LanguageMenu anchorEl={anchorEl} onClose={mockHandleClose} />)

    for (const { label } of languageMenuConstants) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('should change language', async () => {
    mockChangeLanguage.mockResolvedValue(null)

    render(<LanguageMenu anchorEl={anchorEl} onClose={mockHandleClose} />)

    const menuItem = screen.getByText(languageMenuConstants[1].label)
    fireEvent.click(menuItem)

    expect(mockChangeLanguage).toHaveBeenCalledWith(
      languageMenuConstants[1].value
    )
  })

  it('should set language to local storage on success', async () => {
    mockChangeLanguage.mockResolvedValue(null)

    render(<LanguageMenu anchorEl={anchorEl} onClose={mockHandleClose} />)

    const menuItem = screen.getByText(languageMenuConstants[1].label)
    fireEvent.click(menuItem)

    await mockChangeLanguage(languageMenuConstants[1].value)
    expect(setToLocalStorage).toHaveBeenCalledWith(
      'language',
      languageMenuConstants[1].value
    )
  })

  it('should close language menu after successful language change', async () => {
    mockChangeLanguage.mockResolvedValue(null)

    render(<LanguageMenu anchorEl={anchorEl} onClose={mockHandleClose} />)

    const menuItem = screen.getByText(languageMenuConstants[1].label)
    fireEvent.click(menuItem)

    await mockChangeLanguage(languageMenuConstants[1].value)
    expect(mockHandleClose).toHaveBeenCalled()
  })

  it('should dispatch error alert on language change failure', async () => {
    mockChangeLanguage.mockRejectedValue(new Error())

    render(<LanguageMenu anchorEl={anchorEl} onClose={mockHandleClose} />)

    const menuItem = screen.getByText(languageMenuConstants[1].label)
    fireEvent.click(menuItem)

    try {
      await mockChangeLanguage(languageMenuConstants[1].value)
    } catch {
      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith(
          openAlert({
            message: 'Failed to change language',
            severity: 'error',
            duration: 1000
          })
        )
      })
    }
  })
})

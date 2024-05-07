import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import GuestIcons from '~/containers/navigation-icons/guest-icons/GuestIcons'
import { vi } from 'vitest'

const setIsSidebarOpen = vi.fn()
const openLanguageMenu = vi.fn()
const closeLanguageMenu = vi.fn()

vi.mock('~/hooks/use-menu', () => ({
  default: () => ({
    openMenu: openLanguageMenu,
    closeMenu: closeLanguageMenu
  })
}))

describe('test with guest role', () => {
  beforeEach(() => {
    renderWithProviders(
      <GuestIcons
        openLanguageMenu={openLanguageMenu}
        setSidebarOpen={setIsSidebarOpen}
      />
    )
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalled()
  })

  it('should render tooltip title', async () => {
    const loginIcon = screen.getByTestId('LoginIcon')
    fireEvent.mouseOver(loginIcon)
    const loginTooltipTitle = await screen.findByText('iconsTooltip.login')

    expect(loginTooltipTitle).toBeInTheDocument()
  })

  it('should render click Language icon', () => {
    const languageIcon = screen.getByTestId('LanguageIcon')
    fireEvent.click(languageIcon)

    expect(openLanguageMenu).toBeCalled()
  })

  it('should render tooltip title to language icon', async () => {
    const languageIcon = screen.getByTestId('LanguageIcon')
    fireEvent.mouseOver(languageIcon)
    const languageTooltipTitle = await screen.findByText(
      'iconsTooltip.language'
    )

    expect(languageTooltipTitle).toBeInTheDocument()
  })
})

import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Welcome from '~/containers/guest-home-page/Welcome'
import i18next from 'i18next'

vi.mock('i18next', async () => {
  const actual = await vi.importActual('i18next')
  return {
    ...actual,
    language: 'en'
  }
})

describe('Welcome component', () => {
  beforeEach(() => {
    renderWithProviders(<Welcome />)
  })

  it('should have title img', () => {
    const img = screen.getByAltText('Title')

    expect(img).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const title = screen.getByText('guestHomePage.welcomeBlock.description')

    expect(title).toBeInTheDocument()
  })

  it('should have button with correct text', () => {
    const btn = screen.getByText('guestHomePage.welcomeBlock.getStarted')

    expect(btn).toBeInTheDocument()
  })

  it('should have title image when language is set to UK', () => {
    i18next.language = 'uk'

    const img = screen.getByAltText('Title')

    expect(img).toBeInTheDocument()
  })
})

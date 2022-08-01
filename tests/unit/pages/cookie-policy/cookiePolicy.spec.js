import { render, screen } from '@testing-library/react'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'

describe('CookiePolicy component test', () => {
  beforeEach(() => {
    render(<CookiePolicy />)
  })
  it('should have section box', () => {
    const sectionBox = screen.getByTestId('sectionBox')

    expect(sectionBox).toBeInTheDocument()
  })
  it('should have TitleWithDescription with given title and description', () => {
    const title = screen.getByText('cookiePolicyPage.cookiePolicy.title')
    const description = screen.getByText('cookiePolicyPage.cookiePolicy.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
  it('cookieItems should have length equal to 9', () => {
    const cookieItems = screen.getAllByTestId('cookieItems')

    expect(cookieItems).toHaveLength(9)
  })
  it('should have TitleWithDescription with given title, textWithDot and description', () => {
    const title = screen.getByText('cookiePolicyPage.TheCookiesWeSet.title')
    const titleWithDot = screen.getByText('cookiePolicyPage.TheCookiesWeSet.Account.title')
    const description = screen.getByText('cookiePolicyPage.TheCookiesWeSet.Account.description')

    expect(title).toBeInTheDocument()
    expect(titleWithDot).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})

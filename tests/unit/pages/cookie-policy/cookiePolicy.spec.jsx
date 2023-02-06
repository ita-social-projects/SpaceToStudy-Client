import { render, screen } from '@testing-library/react'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'

describe('CookiePolicy component test', () => {
  beforeEach(() => {
    render(<CookiePolicy />)
  })

  it('should have section container', () => {
    const sectionContainer = screen.getByTestId('sectionContainer')

    expect(sectionContainer).toBeInTheDocument()
  })

  it('should have TitleWithDescription with given title and description', () => {
    const title = screen.getByText('cookiePolicyPage.cookiePolicy.title')
    const description = screen.getByText('cookiePolicyPage.cookiePolicy.description')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should have TitleWithDescription with given title, subtitle and description', () => {
    const title = screen.getByText('cookiePolicyPage.theCookiesWeSet.title')
    const subtitle = screen.getByText('cookiePolicyPage.theCookiesWeSet.account.title')
    const description = screen.getByText('cookiePolicyPage.theCookiesWeSet.account.description')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should have TitleWithDescription with given title, subtitle and description 2', () => {
    const title = screen.getByText('cookiePolicyPage.thirdPartyCookies.title')
    const subtitle = screen.getByText('cookiePolicyPage.thirdPartyCookies.subtitle')
    const description = screen.getByText('cookiePolicyPage.thirdPartyCookies.description')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should have TitleWithDescription with given title, subtitle', () => {
    const title = screen.getByText('cookiePolicyPage.moreInformation.title')
    const subtitle = screen.getByText('cookiePolicyPage.moreInformation.subtitle')

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
  })
})

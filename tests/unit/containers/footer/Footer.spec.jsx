import { renderWithProviders } from '~tests/test-utils'

import Footer from '~/containers/layout/footer/Footer'
import { screen } from '@testing-library/react'

describe('Footer component test', () => {
  beforeEach(() => {
    renderWithProviders(<Footer />)
  })
  it('should have title text', () => {
    const title = screen.getByText('footer.allRightsReserved')

    expect(title).toBeInTheDocument()
  })
  it('should have link to Privacy Policy', () => {
    const link = screen.getByText('footer.privacyPolicy')

    expect(link).toBeInTheDocument()
  })
  it('should have link to Term of Use', () => {
    const link = screen.getByText('footer.termOfUse')

    expect(link).toBeInTheDocument()
  })
})

describe('Footer with role component test', () => {
  beforeEach(() => {
    renderWithProviders(<Footer />, {
      preloadedState: { appMain: { userRole: 'tutor' } }
    })
  })
  it('should have Logo', () => {
    const logo = screen.getByAltText('logo')

    expect(logo).toBeInTheDocument()
  })
})

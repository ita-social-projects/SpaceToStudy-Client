import { renderWithProviders } from '~tests/test-utils'

import Footer from '~/components/footer/Footer'
import { screen } from '@testing-library/react'


describe('Footer component test', () => {
  beforeEach(() => {
    renderWithProviders(<Footer />)  
  })
  it('should have title text', () => {
    const title = screen.getByText('common.allRightsReserved')
    
    expect(title).toBeInTheDocument()
  })
  it('should have link to Privacy Policy', () => {
    const link = screen.getByText('Privacy Policy')
    
    expect(link).toBeInTheDocument()
  })
  it('should have link to Term of Use', () => {
    const link = screen.getByText('Term of Use')
    
    expect(link).toBeInTheDocument()
  })
})

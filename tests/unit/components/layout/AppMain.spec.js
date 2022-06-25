import { screen } from '@testing-library/react'

import { renderWithProviders } from '~tests/test-utils'
import AppMain from '~/containers/layout/AppMain'


describe('AppMain layout component test', () => {
  it('should render loader', () => {
    const preloadedState = { appMain: { loading: true, userRole: '' } }
    renderWithProviders(<AppMain />, { preloadedState })
    const loader = screen.getByTestId('loader')
    
    expect(loader).toBeInTheDocument()
  })

  it('should render StudentLayout', () => {
    const preloadedState = { appMain: { loading: false, userRole: 'student' } }
    renderWithProviders(<AppMain />, { preloadedState })
    const studentLayout = screen.getByTestId('studentHome')
    
    expect(studentLayout).toBeInTheDocument()
  })

  it('should render MentorLayout', () => {
    const preloadedState = { appMain: { loading: false, userRole: 'mentor' } }
    renderWithProviders(<AppMain />, { preloadedState })
    const mentorHome = screen.getByTestId('mentorHome')
    
    expect(mentorHome).toBeInTheDocument()
  })
  
  it('should render GuestLayout', () => {
    const preloadedState = { appMain: { loading: false, userRole: '' } }
    renderWithProviders(<AppMain />, { preloadedState })
    const guestHome = screen.getByTestId('guestHome')
    
    expect(guestHome).toBeInTheDocument()
  })
})

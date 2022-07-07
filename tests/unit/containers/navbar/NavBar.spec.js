import { screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '~/containers/navbar/NavBar'
import { renderWithProviders } from '~tests/test-utils'
import { ModalProvider } from '~/context/modal-context'

jest.mock('~/hooks/use-confirm', () => {
  return () => ({
    setNeedConfirmation: () => true
  })
})

describe('Guest NavBar test', () => {

  const preloadedState = { appMain: { loading: false, userRole: '' } }
  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavBar />
      </ModalProvider>, { preloadedState })
  })

  it('should render logo element', () => {
    const logo = screen.getByAltText('logo')

    expect(logo).toBeInTheDocument()
  })
  it('should render navigation item with guestNavBar text', () => {
    const text = screen.getByText('header.whatCanYouDo')
    
    expect(text).toBeInTheDocument()
  })
  it('should click login button', async() => {
    const loginButton = screen.getByText('header.loginButton')
    fireEvent.click(loginButton)
    const img = screen.getByAltText('login') 

    await waitFor(() => expect(img).toBeInTheDocument())
  })
    
  it('should open sidebar with close icon after click menu icon', async () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    expect(menuIcon).toBeInTheDocument()

    fireEvent.click(menuIcon)
    const closeIcon = screen.getByTestId('CloseIcon')

    await waitFor(() => expect(closeIcon).toBeInTheDocument())
  })
})


describe('Student NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'student' } }

  beforeEach(() => {
    renderWithProviders(
      <ModalProvider>
        <NavBar />
      </ModalProvider>, { preloadedState })
  })

  it('should render navigation item with navBar text', () => {
    const text = screen.getByText('header.mentors')

    expect(text).toBeInTheDocument()
  })
  it('should render account icon', () => {
    const icon = screen.getByTestId('AccountCircleOutlinedIcon')

    expect(icon).toBeInTheDocument()
  })

})

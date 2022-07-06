import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import IconsBox from '~/components/icons-box/IconsBox'

const child = (<button>test</button>)
const setIsSidebarOpen = jest.fn()

describe('IconsBox test with guest role', () => {

  beforeEach(() => {
    renderWithProviders(<IconsBox child={ child } setIsSidebarOpen={ setIsSidebarOpen } />)
  })

  it('should render test children element', () => {
    const testButton = screen.getByText('test')

    expect(testButton).toBeInTheDocument()
  })
    
  it('should render language icon', () => {
    const menuIcon = screen.getByTestId('LanguageIcon')
    
    expect(menuIcon).toBeInTheDocument()
  })
    
  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)
    
    expect(setIsSidebarOpen).toBeCalledWith(true)
  })
    
})

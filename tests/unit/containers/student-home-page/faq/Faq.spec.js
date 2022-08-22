import { render, screen, fireEvent } from '@testing-library/react'
import Faq from '~/containers/student-home-page/faq/Faq'

describe('Faq component test', () => {
  beforeEach(() => {
    render(<Faq />)
  })

  it('should render title', () => {
    const title = screen.getByText('studentHomePage.faq.title')

    expect(title).toBeInTheDocument()
  })

  it('should render findTurot text', () => {
    const text = screen.getByText('studentHomePage.faq.findTutor')

    expect(text).toBeInTheDocument()
  })

  it('should open first item after first click on first title and close after second', () => {
    const title = screen.getByText('studentHomePage.faq.findTutor')
    fireEvent.click(title)
    const openFirstItem = screen.getByTestId('0-true')

    expect(openFirstItem).toBeInTheDocument()

    fireEvent.click(title)
    const closeFirstItem = screen.getByTestId('0-false')

    expect(closeFirstItem).toBeInTheDocument()
  })

  it('should open first item, close first item and open second after click on second title', () => {
    const title1 = screen.getByText('studentHomePage.faq.findTutor')
    const title2 = screen.getByText('studentHomePage.faq.bookLeson')
    fireEvent.click(title1)
    const openFirstItem = screen.getByTestId('0-true')
    const closeSecondItem = screen.getByTestId('1-false')

    expect(openFirstItem).toBeInTheDocument()
    expect(closeSecondItem).toBeInTheDocument()

    fireEvent.click(title2)
    const closeFirstItem = screen.getByTestId('0-false')
    const openSecondItem = screen.getByTestId('1-true')

    expect(closeFirstItem).toBeInTheDocument()
    expect(openSecondItem).toBeInTheDocument()
  })
})

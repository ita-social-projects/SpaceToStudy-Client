import { render, screen, fireEvent } from '@testing-library/react'
import Accordions from '~/components/accordion/Accordions'

const onChangeMock = jest.fn()

describe('Accordion component test', () => {
  const props = {
    items: [
      {
        title: 'guestHomePage.accordion.flexibleLocation.title',
        description: 'guestHomePage.accordion.flexibleLocation.description'
      },
      {
        title: 'guestHomePage.accordion.individualTime.title',
        description: 'guestHomePage.accordion.individualTime.description'
      }
    ],
    onChange: onChangeMock,
    activeIndex: '0',
    styles: {}
  }
  beforeEach(() => {
    render(<Accordions { ...props } />)
  })
  it('Test headings', () => {
    const firstTitle = screen.getByText('guestHomePage.accordion.flexibleLocation.title')
    const secondTitle = screen.getByText('guestHomePage.accordion.individualTime.title')

    expect(firstTitle).toBeVisible()
    expect(secondTitle).toBeVisible()
  })
  it('Test descriptions', () => {
    const firstDescription = screen.getByText('guestHomePage.accordion.flexibleLocation.description')
    const secondDescription = screen.getByText('guestHomePage.accordion.individualTime.description')

    expect(firstDescription).toBeInTheDocument()
    expect(secondDescription).not.toBeVisible()
  })
  it('Onclick test', () => {
    const title = screen.getByText('guestHomePage.accordion.individualTime.title')
    fireEvent.click(title)

    expect(props.onChange).toHaveBeenCalled()
  })
})

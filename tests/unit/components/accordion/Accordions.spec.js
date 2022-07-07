import { render, screen, fireEvent } from '@testing-library/react'
import Accordions from '~/components/accordion/Accordions'

const onChangeMock = jest.fn()

describe('Accordion component test', () => {
  const props = {
    items: [
      {
        title: 'title1',
        description: 'description1'
      },
      {
        title: 'title2',
        description: 'description2'
      }
    ],
    onChange: onChangeMock,
    activeIndex: '0',
    styles: {}
  }
  beforeEach(() => {
    render(<Accordions {...props} />)
  })
  it('Test headings', () => {
    const firstTitle = screen.getByText('title1')
    const secondTitle = screen.getByText('title2')

    expect(firstTitle).toBeVisible()
    expect(secondTitle).toBeVisible()
  })
  it('Test descriptions', () => {
    const firstDescription = screen.getByText('description1')
    const secondDescription = screen.getByText('description2')

    expect(firstDescription).toBeInTheDocument()
    expect(secondDescription).toBeInTheDocument()
  })
  it('Onclick test', () => {
    const title = screen.getByText('title2')
    fireEvent.click(title)

    expect(props.onChange).toHaveBeenCalled()
  })
})

describe('Accordions test when isFromGuest equal false', () => {
  const props = {
    items: [
      {
        title: 'title1',
        description: 'description1'
      },
      {
        title: 'title2',
        description: 'description2'
      }
    ],
    isFromGuest: false,
    onChange: onChangeMock,
    activeIndex: '0',
    styles: {}
  }
  beforeEach(() => {
    render(<Accordions { ...props } />)
  })
  it('shuld render expand more icon', () => {
    const expandMoreIcon = screen.getAllByTestId('ExpandMoreRoundedIcon')

    expect(expandMoreIcon).toHaveLength(2)
  })
})

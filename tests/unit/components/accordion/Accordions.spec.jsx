import { render, screen, fireEvent } from '@testing-library/react'
import Accordions from '~/components/accordion/Accordions'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { vi } from 'vitest'

const onChangeMock = vi.fn()

const iconId = 'accordion-icon'

const mockedTitleStyle = vi.fn()

const mockedStyles = {
  withShowMoreIcon: {
    title: mockedTitleStyle
  }
}

describe('Accordion component without expandMoreIcon test', () => {
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
    showMoreIcon: false
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

  it('shuld render expand more icon', () => {
    const expandMoreIcon = screen.queryAllByTestId('ExpandMoreRoundedIcon')

    expect(expandMoreIcon).toHaveLength(0)
  })
})

describe('Accordions test with icon', () => {
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
    icon: <ArrowForwardIosSharpIcon data-testid={iconId} />,
    onChange: onChangeMock,
    activeIndex: 0,
    sx: mockedStyles,
    isMultiple: true
  }
  beforeEach(() => {
    render(<Accordions {...props} />)
  })
  it('should render expand more icon', () => {
    const expandMoreIcon = screen.getAllByTestId(iconId)

    expect(expandMoreIcon).toHaveLength(2)
  })

  it('should perform title function', () => {
    expect(mockedTitleStyle).toHaveBeenCalled()
  })
})

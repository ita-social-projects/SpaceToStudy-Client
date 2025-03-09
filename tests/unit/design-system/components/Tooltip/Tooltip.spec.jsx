import { render, screen } from '@testing-library/react'
import Tooltip from '~scss-components/tooltip/Tooltip'

describe('ToolTip Component', () => {
  test('renders text-only tooltip correctly', () => {
    render(
      <Tooltip
        description='Tooltip Description'
        position='up'
        title='Tooltip Title'
        variant='text'
      />
    )

    const tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass(
      's2s-tooltip',
      's2s-tooltip-text',
      's2s-tooltip-up'
    )
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument()
    expect(screen.getByText('Tooltip Description')).toBeInTheDocument()
  })

  test('renders icon-only tooltip correctly', () => {
    render(<Tooltip position='down' title='Tooltip Title' variant='icon' />)

    const tooltip = screen.getByTestId('tooltip-container')
    expect(tooltip).toHaveClass(
      's2s-tooltip',
      's2s-tooltip-icon',
      's2s-tooltip-down'
    )
    const icon = screen.getByTestId('DoneIcon')
    expect(icon).toBeInTheDocument()
  })

  test('renders icon-text tooltip correctly', () => {
    render(
      <Tooltip
        description='Tooltip Description'
        position='right'
        title='Tooltip Title'
        variant='icon-text'
      />
    )

    const tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass(
      's2s-tooltip',
      's2s-tooltip-icon-text',
      's2s-tooltip-right'
    )
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument()
    expect(screen.getByText('Tooltip Description')).toBeInTheDocument()
    const icon = screen.getByTestId('DoneIcon')
    expect(icon).toBeInTheDocument()
  })

  test('applies correct position classes', () => {
    const { rerender } = render(
      <Tooltip
        description='Tooltip Description'
        position='up'
        title='Tooltip Title'
        variant='text'
      />
    )

    let tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass('s2s-tooltip-up')

    rerender(
      <Tooltip
        description='Tooltip Description'
        position='down'
        title='Tooltip Title'
        variant='text'
      />
    )
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass('s2s-tooltip-down')

    rerender(
      <Tooltip
        description='Tooltip Description'
        position='left'
        title='Tooltip Title'
        variant='text'
      />
    )
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass('s2s-tooltip-left')

    rerender(
      <Tooltip
        description='Tooltip Description'
        position='right'
        title='Tooltip Title'
        variant='text'
      />
    )
    tooltip = screen.getByText('Tooltip Title').closest('.s2s-tooltip')
    expect(tooltip).toHaveClass('s2s-tooltip-right')
  })

  test('renders without a description when it is not provided', () => {
    render(<Tooltip position='up' title='Tooltip Title' variant='text' />)
    expect(screen.getByText('Tooltip Title')).toBeInTheDocument()
    expect(screen.queryByText('Tooltip Description')).not.toBeInTheDocument()
  })
})

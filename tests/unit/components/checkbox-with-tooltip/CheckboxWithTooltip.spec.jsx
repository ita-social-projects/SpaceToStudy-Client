import { fireEvent, render, screen } from '@testing-library/react'
import CheckboxWithTooltip from '~/components/checkbox-with-tooltip/CheckboxWithTooltip'

const props = {
  label: 'Test Checkbox',
  tooltipTitle: 'Test Tooltip',
  onChecked: vi.fn()
}

describe('CheckboxWithTooltip', () => {
  beforeEach(() => {
    render(<CheckboxWithTooltip {...props} />)
  })

  it('renders without crashing', () => {
    const checkbox = screen.getByLabelText(props.label)
    expect(checkbox).toBeInTheDocument()
  })

  it('renders tooltip when user hover over icon', async () => {
    fireEvent.mouseOver(screen.getByTestId('ErrorOutlineIcon'))

    const checkbox = screen.getByLabelText(props.label)
    const tooltip = await screen.findByText(props.tooltipTitle)

    expect(checkbox).toBeInTheDocument()
    expect(tooltip).toBeInTheDocument()
  })

  it('calls onChecked callback when checkbox is toggled', () => {
    const checkbox = screen.getByLabelText(props.label)

    fireEvent.click(checkbox)

    expect(props.onChecked).toHaveBeenCalledWith(true)

    fireEvent.click(checkbox)

    expect(props.onChecked).toHaveBeenCalledWith(false)
  })
})

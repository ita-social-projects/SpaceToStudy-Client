import { render, screen } from '@testing-library/react'
import { InfoOutlined } from '@mui/icons-material'

import Alert from '~scss-components/alert/Alert'

describe('Alert Component', () => {
  test('renders the Alert component with the correct title and description', () => {
    render(<Alert title='Test Title' description='Test Description' />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  test('renders the icon provided via the icon prop', () => {
    render(<Alert icon={<InfoOutlined data-testid='custom-icon' />} />)

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  test('renders the close button when the onClose prop is provided', () => {
    const handleClose = vi.fn()
    render(<Alert onClose={handleClose} />)

    const closeButton = screen.getByRole('button', { name: /.*close.*/i })
    expect(closeButton).toBeInTheDocument()
  })

  test('renders the close button with a label when provided', () => {
    render(<Alert label='Close' onClose={() => {}} />)

    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  test('applies custom className to the Alert component', () => {
    render(<Alert className='custom-class' />)

    const alertElement = screen.getByRole('alert')
    expect(alertElement).toHaveClass('custom-class')
  })

  test('renders description as a paragraph', () => {
    render(<Alert description='Test Description' />)

    expect(screen.getByText('Test Description').tagName).toBe('P')
  })
})

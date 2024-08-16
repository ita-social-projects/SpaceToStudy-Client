import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PasswordSecurityItem from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem'
import { ButtonVariantEnum } from '~/types'

const mockProps = {
  title: 'Password Security Title',
  description: 'Password Security Description',
  buttonText: 'Change Password',
  onClick: vi.fn(),
  buttonVariant: ButtonVariantEnum.Primary
}

const renderComponent = (props = mockProps) => {
  render(<PasswordSecurityItem {...props} />)
}

describe('PasswordSecurityItem', () => {
  beforeEach(() => {
    renderComponent()
  })

  it('renders title and description', () => {
    const title = screen.getByText(mockProps.title)
    const description = screen.getByText(mockProps.description)
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('renders button with correct text', () => {
    const button = screen.getByText(mockProps.buttonText)
    expect(button).toBeInTheDocument()
  })

  it('calls onClick when button is clicked', () => {
    const button = screen.getByText(mockProps.buttonText)
    fireEvent.click(button)
    expect(mockProps.onClick).toHaveBeenCalled()
  })

  it('applies correct button variant class', () => {
    const button = screen.getByText(mockProps.buttonText)
    expect(button).toHaveClass('MuiButton-textPrimary')
    expect(button).toHaveClass('s2s-button')
  })
})

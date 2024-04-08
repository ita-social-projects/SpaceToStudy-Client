import { render, screen, fireEvent } from '@testing-library/react'
import { expect } from 'vitest'
import AppMenuButton from '~/components/app-menu-button/AppMenuButton'

describe('AppMenuButton', () => {
  const mockSetInputValue = vi.fn()
  const mockOnClearAll = vi.fn()

  const defaultProps = {
    selectedItems: [],
    setSelectedItems: vi.fn(),
    children: <div>Children</div>,
    onClearAll: mockOnClearAll,
    setInputValue: mockSetInputValue,
    inputValue: ''
  }

  describe('AppMenuButton', () => {
    beforeEach(() => {
      render(<AppMenuButton {...defaultProps} />)
    })

    it('renders children components', () => {
      expect(screen.getByText('Children')).toBeInTheDocument()
    })

    it('handles input change', () => {
      const input = screen.getByPlaceholderText('common.search')
      fireEvent.change(input, { target: { value: 'test' } })
      expect(mockSetInputValue).toHaveBeenCalledWith('test')
    })

    it('disables clear all button when no items are selected', () => {
      const clearButton = screen.getByRole('button', {
        name: 'header.notifications.clearAll'
      })
      expect(clearButton).toBeDisabled()
    })
  })

  describe('test with input value', () => {
    it('clears input when clear button in the input is clicked', () => {
      render(<AppMenuButton {...{ ...defaultProps, inputValue: 'test' }} />)
      const input = screen.getByPlaceholderText('common.search')
      expect(input.value).toBe('test')
      const clearButton = screen.getByTestId('clearIcon')
      fireEvent.click(clearButton)
      expect(mockSetInputValue).toHaveBeenCalledWith('')
    })
  })

  describe('test with selected items', () => {
    beforeEach(() => {
      render(
        <AppMenuButton {...{ ...defaultProps, selectedItems: ['item1'] }} />
      )
    })

    it('enables clear all button when items are selected', () => {
      const clearButton = screen.getByRole('button', {
        name: 'header.notifications.clearAll'
      })
      expect(clearButton).not.toBeDisabled()
    })

    it('calls onClearAll when clear all button is clicked', () => {
      const clearButton = screen.getByRole('button', {
        name: 'header.notifications.clearAll'
      })
      fireEvent.click(clearButton)
      expect(mockOnClearAll).toHaveBeenCalled()
    })
  })
})

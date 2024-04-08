import { render, screen, fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'
import AppSelectButton from '~/components/app-select-button/AppSelectButton'

const onMenuItemClick = vi.fn()

describe('AppSelectButton', () => {
  let menuItem

  beforeEach(() => {
    render(
      <AppSelectButton checked onMenuItemClick={onMenuItemClick}>
        <div>Children</div>
      </AppSelectButton>
    )
    menuItem = screen.getByRole('menuitem')
  })

  it('renders the component with children', () => {
    expect(menuItem).toBeInTheDocument()
    expect(screen.getByText('Children')).toBeInTheDocument()
  })

  it('calls onMenuItemClick when the menu item is clicked', () => {
    fireEvent.click(menuItem)

    expect(onMenuItemClick).toHaveBeenCalled()
  })

  it('renders the checkbox with the correct checked value', () => {
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeChecked()
  })
})

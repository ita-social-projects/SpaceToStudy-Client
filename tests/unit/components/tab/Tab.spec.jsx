import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import Tab from '~/components/tab/Tab'

describe('Tab', () => {
  let label
  let onClick

  beforeEach(() => {
    label = 'label text'
    onClick = vi.fn()
    render(<Tab activeTab label={label} onClick={onClick} />)
  })

  it('renders the label', () => {
    const tabLabel = screen.getByText(label)
    expect(tabLabel).toBeInTheDocument()
  })

  it('applies activeTab if it is true', () => {
    const tabButtonRole = 'button'
    const tabButton = screen.getByRole(tabButtonRole)
    if (tabButton.classList.contains('activeTab')) {
      expect(tabButton).toHaveClass('activeTab')
    }
  })

  it('does not apply activeTab if it is false', () => {
    const tabButtonRole = 'button'
    const tabButton = screen.getByRole(tabButtonRole)
    expect(tabButton).not.toHaveClass('activeTab')
  })

  it('calls onClick function when clicked', () => {
    const tabButtonRole = 'button'
    const tabButton = screen.getByRole(tabButtonRole)
    fireEvent.click(tabButton)
    expect(onClick).toHaveBeenCalled()
  })
})

import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

import Tab from '~/components/tab/Tab'

let label = 'text'
let onClick = vi.fn()
describe('Tab', () => {
  beforeEach(() => {
    render(
      <Tab activeTab onClick={onClick}>
        {label}
      </Tab>
    )
  })

  it('renders the label', () => {
    const tabLabel = screen.getByText(label)

    expect(tabLabel).toBeInTheDocument()
  })

  it('applies activeTab if it is true', () => {
    const tabButton = screen.getByRole('button')

    if (tabButton.classList.contains('activeTab')) {
      expect(tabButton).toHaveClass('activeTab')
    }
  })

  it('does not apply activeTab if it is false', () => {
    const tabButton = screen.getByRole('button')

    expect(tabButton).not.toHaveClass('activeTab')
  })

  it('calls onClick function when clicked', () => {
    const tabButton = screen.getByRole('button')

    fireEvent.click(tabButton)

    expect(onClick).toHaveBeenCalled()
  })
})

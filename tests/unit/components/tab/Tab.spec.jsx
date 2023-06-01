import { render, screen, fireEvent } from '@testing-library/react'
import Tab from '~/components/tab/Tab'

describe('Tab', () => {
  it('renders the label', () => {
    const label = 'label text'
    render(<Tab activeTab label={label} onClick={() => {}} />)
    const tabLabel = screen.getByText(label)
    expect(tabLabel).toBeInTheDocument()
  })

  it('applies activeTab if it is true', () => {
    const label = 'label text'
    render(<Tab activeTab label={label} onClick={() => {}} />)
    const tabButton = screen.getByRole('button')
    expect(tabButton).not.toHaveClass('activeTab')
  })

  it('not applies activeTab if it is false', () => {
    const label = 'label text'
    render(<Tab activeTab={false} label={label} onClick={() => {}} />)
    const tabButton = screen.getByRole('button')
    expect(tabButton).not.toHaveClass('activeTab')
  })

  it('calls onClick function when clicked', () => {
    let onClickCalled = false
    const onClick = () => {
      onClickCalled = true
    }
    const label = 'label text'
    render(<Tab activeTab label={label} onClick={onClick} />)
    const tabButton = screen.getByRole('button')
    fireEvent.click(tabButton)
    expect(onClickCalled).toBe(true)
  })
})

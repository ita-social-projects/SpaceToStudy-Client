import { render, fireEvent, screen } from '@testing-library/react'
import MenuItem from '~scss-components/menu-item/MenuItem'

const resourceMenuItemTitle = 'Lesson'

const icon = <svg data-testid='lesson-icon' />

const checkbox = <input type='checkbox' />

const additionalInfo = 'This is a lesson'

describe('MenuItem Component', () => {
  test('should render menu item', () => {
    render(<MenuItem title={resourceMenuItemTitle} />)
    expect(screen.getByText(resourceMenuItemTitle)).toBeInTheDocument()
  })

  test('should call onClick when menu item is clicked', () => {
    const onClick = vi.fn()
    render(<MenuItem title={resourceMenuItemTitle} onClick={onClick} />)
    fireEvent.click(screen.getByText(resourceMenuItemTitle))
    expect(onClick).toHaveBeenCalled()
  })

  test('should render svg graphics', () => {
    render(<MenuItem title={resourceMenuItemTitle} graphics={icon} />)
    expect(screen.getByTestId('lesson-icon')).toBeInTheDocument()
  })

  test('should render checkbox', () => {
    render(<MenuItem title={resourceMenuItemTitle} graphics={checkbox} />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  test('should display close button when removal is enabled', () => {
    const { container } = render(
      <MenuItem title={resourceMenuItemTitle} onRemove={() => {}} />
    )
    const closeButton = container.querySelector('.s2s-item__close')

    expect(closeButton).toBeInTheDocument()
  })

  test('should not display close button when dropdown is enabled', () => {
    const { container } = render(
      <MenuItem title={resourceMenuItemTitle} isDropdown onRemove={() => {}} />
    )
    const closeButton = container.querySelector('.s2s-item__close')

    expect(closeButton).not.toBeInTheDocument()
  })

  test('should call onRemove when close button is clicked', () => {
    const onRemove = vi.fn()
    const { container } = render(
      <MenuItem title={resourceMenuItemTitle} onRemove={onRemove} />
    )
    fireEvent.click(container.querySelector('.s2s-item__close'))
    expect(onRemove).toHaveBeenCalled()
  })

  test('should render additional info', () => {
    render(
      <MenuItem title={resourceMenuItemTitle} additionalInfo={additionalInfo} />
    )
    expect(screen.getByText(additionalInfo)).toBeInTheDocument()
  })
})

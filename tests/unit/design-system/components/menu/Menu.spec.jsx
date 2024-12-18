import { render, fireEvent, screen } from '@testing-library/react'
import Menu from '~scss-components/menu/Menu'

const resourcesMenuItems = [
  { title: 'Lesson' },
  { title: 'Quiz' },
  { title: 'Attachment' }
]

const resourcesMenuItemsWithCustomArgs = [
  { title: 'Lesson', defaultOnItemClickArgs: { path: '/lesson' } }
]

const resourcesMenuItemsWithNestedItems = [
  { title: 'Lesson', nestedMenuItems: [{ title: 'Art' }, { title: 'Math' }] }
]

const resourcesMenuItemsWithAdditionalInfo = [
  { title: 'Lesson', additionalInfo: 'This is a lesson' }
]

const lessonIcon = <svg data-testid='lesson-icon' />

const resourcesMenuItemsWithIcon = [{ title: 'Lesson', graphics: lessonIcon }]

const noItemsCustomMessage = 'No items available.'

describe('Menu Component', () => {
  let anchor

  beforeEach(() => {
    render(<button data-testid='default-anchor' />)
    anchor = screen.getByTestId('default-anchor')
  })

  test('should render menu items', () => {
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItems}
      />
    )

    expect(screen.getByText('Lesson')).toBeInTheDocument()
    expect(screen.getByText('Quiz')).toBeInTheDocument()
    expect(screen.getByText('Attachment')).toBeInTheDocument()
  })

  test('should remove item when removal is enabled', () => {
    const { getByText } = render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItems}
        isItemsRemovalEnabled={true}
      />
    )

    const removeButton = getByText('Clear all')
    fireEvent.click(removeButton)

    expect(screen.queryByText('Lesson')).toBeNull()
    expect(screen.queryByText('Quiz')).toBeNull()
    expect(screen.queryByText('Attachment')).toBeNull()
  })

  test('should show no items message when no items left and removal is enabled', () => {
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={[]}
        noItemsMessage={noItemsCustomMessage}
        isItemsRemovalEnabled={true}
      />
    )

    expect(screen.getByText(noItemsCustomMessage)).toBeInTheDocument()
  })

  test('should set anchor element when clicking the button', () => {
    const setAnchorEl = vi.fn()
    const handleClick = vi.fn((event) => setAnchorEl(event.currentTarget))

    render(
      <>
        <button onClick={handleClick}>Open Menu</button>
        <Menu
          anchorEl={null}
          setAnchorEl={setAnchorEl}
          menuItems={resourcesMenuItems}
        />
      </>
    )

    const button = screen.getByText('Open Menu')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalled()
    expect(setAnchorEl).toHaveBeenCalledWith(button)
  })

  test('should trigger defaultOnItemClick with default arguments when a menu item is clicked', () => {
    const defaultOnItemClick = vi.fn()
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItems}
        defaultOnItemClick={defaultOnItemClick}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)
    expect(defaultOnItemClick).toHaveBeenCalledWith({ title: 'Lesson' })
  })

  test('should trigger defaultOnItemClick with custom arguments when a menu item is clicked', () => {
    const defaultOnItemClick = vi.fn()
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItemsWithCustomArgs}
        defaultOnItemClick={defaultOnItemClick}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)
    expect(defaultOnItemClick).toHaveBeenCalledWith({
      title: 'Lesson',
      path: '/lesson'
    })
  })

  test('should trigger defaultOnItemClick default arguments when a nested menu item is clicked', () => {
    const defaultOnItemClick = vi.fn()
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItemsWithNestedItems}
        defaultOnItemClick={defaultOnItemClick}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)

    const art = screen.getByText('Art')
    fireEvent.click(art)
    expect(defaultOnItemClick).toHaveBeenCalledWith({ title: 'Art' })
  })

  test('should show nested items when a menu item is clicked', () => {
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItemsWithNestedItems}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)

    expect(screen.getByText('Art')).toBeInTheDocument()
    expect(screen.getByText('Math')).toBeInTheDocument()
  })

  test('should display additional info when it is provided', () => {
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItemsWithAdditionalInfo}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)

    expect(screen.getByText('This is a lesson')).toBeInTheDocument()
  })

  test('should display icon when it is provided', () => {
    render(
      <Menu
        anchorEl={anchor}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItemsWithIcon}
      />
    )

    const lesson = screen.getByText('Lesson')
    fireEvent.click(lesson)

    expect(screen.getByTestId('lesson-icon')).toBeInTheDocument()
  })
})

import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import Menu from '~scss-components/menu/Menu'

const resourcesMenuItems = [
  { title: 'Lesson' },
  { title: 'Quiz' },
  { title: 'Attachment' }
]

const noItemsCustomMessage = 'No items available.'

describe('Menu Component', () => {
  test('should render menu items', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItems}
        toggledItemsTitles={[]}
      />
    )

    expect(screen.getByText('Lesson')).toBeInTheDocument()
    expect(screen.getByText('Quiz')).toBeInTheDocument()
    expect(screen.getByText('Attachment')).toBeInTheDocument()
  })

  test('should remove item when removal is enabled', async () => {
    const { getByText } = render(
      <Menu
        anchorEl={document.createElement('div')}
        setAnchorEl={() => {}}
        menuItems={resourcesMenuItems}
        isItemsRemovalEnabled={true}
      />
    )

    const removeButton = getByText('Clear all')
    fireEvent.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByText('Lesson')).not.toBeInTheDocument()
      expect(screen.queryByText('Quiz')).not.toBeInTheDocument()
      expect(screen.queryByText('Attachment')).not.toBeInTheDocument()
    })
  })

  test('should show no items message when no items left and removal is enabled', () => {
    render(
      <Menu
        anchorEl={document.createElement('div')}
        setAnchorEl={() => {}}
        menuItems={[]}
        noItemsMessage={noItemsCustomMessage}
        isItemsRemovalEnabled={true}
      />
    )

    expect(screen.getByText(noItemsCustomMessage)).toBeInTheDocument()
  })
})

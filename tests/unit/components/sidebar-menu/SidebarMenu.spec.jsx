import { render, screen, fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import GppGoodIcon from '@mui/icons-material/GppGood'

const iconId = 'accordion-icon'

const tabsData = {
  tab1: {
    title: 'Tab 1',
    content: <div>Tab Content1</div>,
    icon: <GppGoodIcon data-testid={iconId} />
  },
  tab2: {
    title: 'Tab 2',
    content: <div>Tab Content2</div>,
    icon: <NotificationsIcon data-testid={iconId} />
  },
  tab3: {
    title: 'Tab 3',
    content: <div>Tab Content3</div>,
    icon: <AccountCircleIcon data-testid={iconId} />
  }
}
const handleClick = vi.fn()

describe('SidebarMenu', () => {
  let menuItems, icons

  beforeEach(() => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)
    menuItems = screen.getAllByRole('listitem')
    icons = screen.getAllByTestId(iconId)
  })

  it('renders the correct number of menu items', () => {
    expect(menuItems).toHaveLength(Object.keys(tabsData).length)
  })

  it('renders the correct text for each menu item', () => {
    Object.values(tabsData).forEach((tabData) => {
      expect(screen.getByText(tabData.title)).toBeInTheDocument()
    })
  })

  it('calls handleClick when a menu item is clicked', () => {
    fireEvent.click(menuItems[0])

    expect(handleClick).toHaveBeenCalled()
  })

  it('renders the correct number of icons', () => {
    expect(icons).toHaveLength(Object.keys(tabsData).length)
  })
})

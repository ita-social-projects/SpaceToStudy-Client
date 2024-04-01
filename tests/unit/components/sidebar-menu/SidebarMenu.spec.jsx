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
  it('renders without crashing', () => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)
  })

  it('renders correct number of menu items', () => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)

    const menuItems = screen.getAllByRole('listitem')

    expect(menuItems).toHaveLength(Object.keys(tabsData).length)
  })

  it('renders correct text for each menu item', () => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)

    Object.values(tabsData).forEach((tabData) => {
      expect(screen.getByText(tabData.title)).toBeInTheDocument()
    })
  })

  it('calls handleClick when a menu item is clicked', () => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)

    const menuItems = screen.getAllByRole('listitem')

    fireEvent.click(menuItems[0])

    expect(handleClick).toHaveBeenCalled()
  })

  it('renders correct icons for each menu item', () => {
    render(<SidebarMenu handleClick={handleClick} tabsData={tabsData} />)
    const icons = screen.getAllByTestId(iconId)

    expect(icons).toHaveLength(3)
  })
})

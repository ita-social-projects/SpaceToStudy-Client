import { FC, useState } from 'react'
import { Menu as MuiMenu } from '@mui/material'

import { MenuItemProps as NestedMenuItemProps } from '~scss-components/menu-item/menu-item.types'
import MenuItem from '../menu-item/MenuItem'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps extends NestedMenuItemProps {
  additionalInfo?: string
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps {
  anchorEl: HTMLElement | null
  setAnchorEl: (anchorEl: HTMLElement | null) => void
  menuItems: MenuItemProps[]
  density?: 1 | 2
}

const Menu: FC<MenuProps> = ({
  anchorEl,
  setAnchorEl,
  menuItems,
  density = 1
}: MenuProps) => {
  const [toggledItem, setToggledItem] = useState<string | null>(null)

  const handleItemClick = ({ title, onClick }: MenuItemProps) => {
    setToggledItem((previousTitle) => (previousTitle === title ? null : title))

    if (onClick) {
      onClick()
      handleMenuClose()
    }
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <MuiMenu
      anchorEl={anchorEl}
      className={`s2s-menu s2s-menu--density-${density}`}
      onClose={handleMenuClose}
      open={Boolean(anchorEl)}
    >
      {menuItems.flatMap((item) => [
        <MenuItem
          {...item}
          density={density}
          isDropdown={Boolean(item.nestedMenuItems)}
          isToggled={toggledItem === item.title}
          key={item.title}
          onClick={() => handleItemClick(item)}
        />,
        ...(item.nestedMenuItems && toggledItem === item.title
          ? item.nestedMenuItems.map((nestedMenuItem) => (
              <MenuItem
                {...nestedMenuItem}
                density={1}
                key={nestedMenuItem.title}
                onClick={() => handleItemClick(nestedMenuItem)}
                variant='nested'
              />
            ))
          : [])
      ])}
    </MuiMenu>
  )
}

export default Menu

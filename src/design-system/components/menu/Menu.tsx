import { FC, useState } from 'react'
import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'

import { MenuItemProps as NestedMenuItemProps } from '~scss-components/menu-item/menu-item.types'
import MenuItem from '../menu-item/MenuItem'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps extends NestedMenuItemProps {
  additionalInfo?: string
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps extends Omit<MuiMenuProps, 'onClick'> {
  menuItems: MenuItemProps[]
  density?: 1 | 2
}

const Menu: FC<MenuProps> = ({ menuItems, open, density = 1 }: MenuProps) => {
  const [toggledItem, setToggledItem] = useState<string | null>(null)

  const handleTopLevelItemClick = ({ title, onClick }: MenuItemProps) => {
    setToggledItem((previousTitle) => (previousTitle === title ? null : title))

    if (onClick) {
      onClick()
    }
  }

  return (
    <MuiMenu className={`s2s-menu s2s-menu--density-${density}`} open={open}>
      {menuItems.flatMap((item) => [
        <MenuItem
          {...item}
          density={density}
          isDropdown={Boolean(item.nestedMenuItems)}
          isToggled={toggledItem === item.title}
          key={item.title}
          onClick={() => handleTopLevelItemClick(item)}
        />,
        ...(item.nestedMenuItems && toggledItem === item.title
          ? item.nestedMenuItems.map((nestedMenuItem) => (
              <MenuItem
                {...nestedMenuItem}
                density={1}
                key={nestedMenuItem.title}
                onClick={() => handleTopLevelItemClick(nestedMenuItem)}
                variant='nested'
              />
            ))
          : [])
      ])}
    </MuiMenu>
  )
}

export default Menu

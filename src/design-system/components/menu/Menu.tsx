import { FC, useState } from 'react'
import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'

import { MenuItemProps as NestedMenuItemProps } from '~scss-components/menu-item/menu-item.types'
import MenuItem from '../menu-item/MenuItem'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps extends NestedMenuItemProps {
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps extends Omit<MuiMenuProps, 'onClick'> {
  menuItems: MenuItemProps[]
  density?: 1 | 2
}

const Menu: FC<MenuProps> = ({ menuItems, open, density = 1 }: MenuProps) => {
  const [expandedNestedItem, setExpandedNestedItem] = useState<string | null>(
    null
  )

  const handleTopLevelItemClick = ({
    nestedMenuItems,
    title,
    onClick
  }: MenuItemProps) => {
    nestedMenuItems &&
      setExpandedNestedItem((previousTitle) =>
        previousTitle === title ? null : title
      )

    onClick && onClick()
  }

  return (
    <MuiMenu className={`s2s-menu s2s-menu--density-${density}`} open={open}>
      {menuItems.flatMap((item) => [
        <MenuItem
          {...item}
          density={density}
          isDropdown={Boolean(item.nestedMenuItems)}
          key={item.title}
          onClick={() => handleTopLevelItemClick(item)}
        />,
        ...(item.nestedMenuItems && expandedNestedItem === item.title
          ? item.nestedMenuItems.map((nestedMenuItemProps) => (
              <MenuItem
                {...nestedMenuItemProps}
                density={density}
                key={nestedMenuItemProps.title}
                onClick={() => nestedMenuItemProps.onClick}
                variant='nested'
              />
            ))
          : [])
      ])}
    </MuiMenu>
  )
}

export default Menu

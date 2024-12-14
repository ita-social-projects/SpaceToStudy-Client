import { FC, Fragment } from 'react'
import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material'

import { MenuItemProps as NestedMenuItemProps } from '~scss-components/menu-item/menu-item.types'
import MenuItem from '../menu-item/MenuItem'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps extends NestedMenuItemProps {
  nestedMenuItems?: NestedMenuItemProps[]
}

interface MenuProps extends MuiMenuProps {
  menuItems: MenuItemProps[]
  density?: 1 | 2
}

const Menu: FC<MenuProps> = ({ menuItems, open, density = 1 }: MenuProps) => {
  return (
    <MuiMenu className={`s2s-menu s2s-menu--density-${density}`} open={open}>
      {menuItems.map(({ nestedMenuItems, ...menuItemProps }) => (
        <Fragment key={menuItemProps.title}>
          <MenuItem
            {...menuItemProps}
            density={density}
            dropDownIconVariant={nestedMenuItems && 'down'}
          />
          {nestedMenuItems &&
            nestedMenuItems.map((nestedMenuItemProps) => (
              <MenuItem
                {...nestedMenuItemProps}
                density={density}
                key={nestedMenuItemProps.title}
                variant='nested'
              />
            ))}
        </Fragment>
      ))}
    </MuiMenu>
  )
}

export default Menu

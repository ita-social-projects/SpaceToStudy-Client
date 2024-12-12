import { FC } from 'react'
import {
  MenuItem,
  Menu as MuiMenu,
  MenuProps as MuiMenuProps
} from '@mui/material'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps {
  title: string
}

interface MenuProps extends MuiMenuProps {
  menuItems: MenuItemProps[]
  density?: 'density-1' | 'density-2'
}

const Menu: FC<MenuProps> = ({
  menuItems,
  open,
  density = 'density-1'
}: MenuProps) => {
  return (
    <MuiMenu className={`s2s-menu s2s-menu--${density}`} open={open}>
      {menuItems.map((menuItem) => (
        <MenuItem className='s2s-menu__list-item' key={menuItem.title}>
          {menuItem.title}
        </MenuItem>
      ))}
    </MuiMenu>
  )
}

export default Menu

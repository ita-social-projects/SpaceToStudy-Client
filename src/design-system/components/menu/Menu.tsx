import { FC, ReactNode } from 'react'
import {
  MenuItem,
  Menu as MuiMenu,
  MenuProps as MuiMenuProps
} from '@mui/material'

import '~scss-components/menu/Menu.scss'

interface MenuItemProps {
  title: string
  additionalInfo?: string
  nestedMenuItems?: MenuItemProps[]
  graphics?: ReactNode
}

interface MenuProps extends MuiMenuProps {
  menuItems: MenuItemProps[]
  density?: 1 | 2
}

const Menu: FC<MenuProps> = ({ menuItems, open, density = 1 }: MenuProps) => {
  return (
    <MuiMenu className={`s2s-menu s2s-menu--density-${density}`} open={open}>
      {menuItems.map((menuItem) => (
        <MenuItem className='s2s-menu__item' key={menuItem.title}>
          {menuItem.graphics && (
            <div className='s2s-menu__item-graphics'>{menuItem.graphics}</div>
          )}
          <div className='s2s-menu__item-text-box'>
            <span className='s2s-menu__item-additional-info'>
              {menuItem.additionalInfo}
            </span>
            <span className='s2s-menu__item-title'>{menuItem.title}</span>
          </div>
        </MenuItem>
      ))}
    </MuiMenu>
  )
}

export default Menu

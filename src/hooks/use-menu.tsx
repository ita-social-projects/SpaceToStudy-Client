import { MouseEvent, ReactNode, useState } from 'react'
import Menu, { MenuProps } from '@mui/material/Menu'

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<MenuProps['anchorEl']>(null)

  const openMenu = (event?: MouseEvent) => {
    setAnchorEl(event?.currentTarget ?? null)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const renderMenu = (
    menuItems: ReactNode | ReactNode[],
    menuProps?: Omit<MenuProps, 'open'>
  ) => (
    <Menu
      anchorEl={anchorEl}
      onClose={closeMenu}
      open={Boolean(anchorEl)}
      {...menuProps}
    >
      {menuItems}
    </Menu>
  )

  return { anchorEl, openMenu, closeMenu, renderMenu }
}

export default useMenu

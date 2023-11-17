import { useState } from 'react'

import Menu from '@mui/material/Menu'

const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const renderMenu = (menuItems, menuProps) => (
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

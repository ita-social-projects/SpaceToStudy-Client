import Menu from '@mui/material/Menu'

import { spliceSx } from '~/utils/helper-functions'

import { styles } from '~/components/app-menu/AppMenu.styles'

const AppMenu = ({ maxHeight, menuList, sx, ...props }) => {
  return (
    <Menu
      PaperProps={{
        style: {
          maxHeight
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      sx={spliceSx(styles.menu, sx)}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      {...props}
    >
      {menuList}
    </Menu>
  )
}

export default AppMenu

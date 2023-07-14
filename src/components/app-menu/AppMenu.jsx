import Menu from '@mui/material/Menu'

import { spliceSx } from '~/utils/helper-functions'

import { styles } from '~/components/app-menu/AppMenu.styles'
import { PositionEnum } from '~/types'

const AppMenu = ({ maxHeight, menuList, sx, ...props }) => {
  return (
    <Menu
      PaperProps={{
        style: {
          maxHeight
        }
      }}
      anchorOrigin={{
        vertical: PositionEnum.Bottom,
        horizontal: PositionEnum.Right
      }}
      sx={spliceSx(styles.menu, sx)}
      transformOrigin={{
        vertical: PositionEnum.Top,
        horizontal: PositionEnum.Right
      }}
      {...props}
    >
      {menuList}
    </Menu>
  )
}

export default AppMenu

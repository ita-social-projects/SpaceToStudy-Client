import { FC } from 'react'
import Menu, { MenuProps } from '@mui/material/Menu'
import { spliceSx } from '~/utils/helper-functions'
import { PositionEnum } from '~/types'
import { styles } from '~/components/app-menu/AppMenu.styles'

interface AppMenuProps extends MenuProps {
  maxHeight?: number
  menuList: JSX.Element | JSX.Element[]
}

const AppMenu: FC<AppMenuProps> = ({ maxHeight, menuList, sx, ...props }) => {
  return (
    <Menu
      anchorOrigin={{
        horizontal: PositionEnum.Right,
        vertical: PositionEnum.Bottom
      }}
      slotProps={{
        paper: {
          sx: {
            maxHeight: maxHeight
          }
        }
      }}
      sx={spliceSx(styles.menu, sx)}
      transformOrigin={{
        horizontal: PositionEnum.Right,
        vertical: PositionEnum.Top
      }}
      {...props}
    >
      {menuList}
    </Menu>
  )
}

export default AppMenu

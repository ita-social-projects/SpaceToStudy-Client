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

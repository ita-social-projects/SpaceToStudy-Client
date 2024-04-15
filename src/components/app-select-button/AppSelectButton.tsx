import { FC, ReactNode } from 'react'
import { Checkbox, MenuItem } from '@mui/material'

import { styles } from '~/components/app-select-button/AppSelectButton.styles'

interface AppSelectButtonProps {
  onMenuItemClick: () => void
  checked: boolean
  children: ReactNode
}

const AppSelectButton: FC<AppSelectButtonProps> = ({
  checked,
  children,
  onMenuItemClick
}) => {
  return (
    <MenuItem onClick={onMenuItemClick} sx={styles.text}>
      <Checkbox checked={checked} />
      {children}
    </MenuItem>
  )
}

export default AppSelectButton

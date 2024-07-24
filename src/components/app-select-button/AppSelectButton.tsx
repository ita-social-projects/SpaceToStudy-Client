import { FC, ReactNode } from 'react'
import { Checkbox, MenuItem } from '@mui/material'

import { styles } from '~/components/app-select-button/AppSelectButton.styles'

interface AppSelectButtonProps {
  onMenuItemClick: () => void
  checked: boolean
  disabled?: boolean
  children: ReactNode
}

const AppSelectButton: FC<AppSelectButtonProps> = ({
  checked,
  children,
  onMenuItemClick,
  disabled = false
}) => {
  return (
    <MenuItem disabled={disabled} onClick={onMenuItemClick} sx={styles.text}>
      <Checkbox checked={checked} disabled={disabled} />
      {children}
    </MenuItem>
  )
}

export default AppSelectButton

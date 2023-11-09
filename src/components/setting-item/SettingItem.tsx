import React from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

import { defaultStyles } from '~/components/app-content-switcher/AppContentSwitcher.styles'
import { styles } from '~/components/setting-item/SettingItem.styles'

interface SettingItemProps {
  title: string
  subtitle: string
  checked: boolean
  dataTestId: string
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
}

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  checked,
  dataTestId,
  onChange
}) => {
  return (
    <Box sx={styles.settingContainer}>
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.subtitle}>{subtitle}</Typography>
      </Box>
      <Switch
        checked={checked}
        data-testid={dataTestId}
        onChange={onChange}
        sx={defaultStyles.switch}
      />
    </Box>
  )
}

export default SettingItem

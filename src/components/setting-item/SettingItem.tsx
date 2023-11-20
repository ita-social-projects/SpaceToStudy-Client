import { ReactNode, FC } from 'react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/setting-item/SettingItem.styles'

interface SettingItemProps {
  title: string
  subtitle: string
  children: ReactNode
}

const SettingItem: FC<SettingItemProps> = ({ title, subtitle, children }) => {
  return (
    <Box sx={styles.settingContainer}>
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.subtitle}>{subtitle}</Typography>
      </Box>
      {children}
    </Box>
  )
}

export default SettingItem

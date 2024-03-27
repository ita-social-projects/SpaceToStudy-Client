import { ReactNode, FC } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material'

import { styles } from '~/components/setting-item/SettingItem.styles'
import { spliceSx } from '~/utils/helper-functions'

interface SettingItemProps {
  title: string
  subtitle: string
  children: ReactNode
  style?: SxProps
}

const SettingItem: FC<SettingItemProps> = ({
  title,
  subtitle,
  children,
  style
}) => {
  return (
    <Box sx={spliceSx(styles.settingContainer, style)}>
      <Box>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.subtitle}>{subtitle}</Typography>
      </Box>
      {children}
    </Box>
  )
}

export default SettingItem

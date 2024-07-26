import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Theme } from '@emotion/react'

import AppButton from '~/components/app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'

import { styles } from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem.styles'
import { ButtonVariantEnum, SizeEnum } from '~/types'

interface PasswordSecurityItemProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  sx?: SxProps<Theme>
}

const PasswordSecurityItem = ({
  title,
  description,
  buttonText,
  onClick,
  sx
}: PasswordSecurityItemProps) => (
  <AppCard sx={styles.container}>
    <Box sx={styles.titlesAndButtonContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <Typography sx={styles.description}>{description}</Typography>
    </Box>

    <AppButton
      onClick={onClick}
      size={SizeEnum.Medium}
      sx={sx}
      variant={ButtonVariantEnum.Tonal}
    >
      {buttonText}
    </AppButton>
  </AppCard>
)

export default PasswordSecurityItem

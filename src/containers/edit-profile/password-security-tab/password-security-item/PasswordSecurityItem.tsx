import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppCard from '~/components/app-card/AppCard'

import { ButtonVariantEnum, SizeEnum } from '~/types'

import { styles } from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem.styles'

interface PasswordSecurityItemProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  buttonVariant: ButtonVariantEnum
}

const PasswordSecurityItem = ({
  title,
  description,
  buttonText,
  onClick,
  buttonVariant
}: PasswordSecurityItemProps) => (
  <AppCard sx={styles.container}>
    <Box sx={styles.titlesAndButtonContainer}>
      <Typography sx={styles.title}>{title}</Typography>
      <Typography sx={styles.description}>{description}</Typography>
    </Box>

    <AppButton
      onClick={onClick}
      size={SizeEnum.Medium}
      sx={styles.appButton}
      variant={buttonVariant}
    >
      {buttonText}
    </AppButton>
  </AppCard>
)

export default PasswordSecurityItem

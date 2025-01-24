import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '~scss-components/button/Button'
import AppCard from '~/components/app-card/AppCard'

import { styles } from '~/containers/edit-profile/password-security-tab/password-security-item/PasswordSecurityItem.styles'

interface PasswordSecurityItemProps {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  buttonVariant: 'tonal' | 'tonal-error'
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

    <Button
      onClick={onClick}
      size='md'
      sx={styles.appButton}
      variant={buttonVariant}
    >
      {buttonText}
    </Button>
  </AppCard>
)

export default PasswordSecurityItem

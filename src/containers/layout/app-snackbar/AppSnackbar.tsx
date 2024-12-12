import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Snackbar from '@mui/material/Snackbar'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { closeAlert, snackbarSelector } from '~/redux/features/snackbarSlice'

import Alert from '~/design-system/components/alert/Alert'

import { styles } from '~/containers/layout/app-snackbar/AppSnackbar.styles'

const AppSnackbar = () => {
  const { isOpened, message, duration, severity, isExtended, route } =
    useAppSelector(snackbarSelector)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClose = () => dispatch(closeAlert())

  const translatedMessage =
    typeof message === 'string' ? t(message) : t(message.text, message.options)

  const handleButtonClick = () => {
    navigate(route!)
    handleClose()
  }

  const actionButton = (
    <Box onClick={handleButtonClick} sx={styles.action}>
      {t('offerPage.createOffer.seeAll')}
    </Box>
  )

  const [firstMessage, secondMessage] = isExtended
    ? translatedMessage.split(';')
    : translatedMessage.split(', ')

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={handleClose}
      open={isOpened}
    >
      <Alert
        action={isExtended && actionButton}
        description={secondMessage}
        severity={severity}
        title={firstMessage}
        variant='filled'
      />
    </Snackbar>
  )
}

export default AppSnackbar

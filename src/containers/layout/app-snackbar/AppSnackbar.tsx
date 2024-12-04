import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

import { closeAlert, snackbarSelector } from '~/redux/features/snackbarSlice'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
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

  const actionBody = translatedMessage
    .split(', ')
    .map((line) => <Box key={line}>{line}</Box>)

  const handleButtonClick = () => {
    navigate(route!)
    handleClose()
  }

  const actionButton = (
    <Box onClick={handleButtonClick} sx={styles.action}>
      {t('offerPage.createOffer.seeAll')}
    </Box>
  )

  const [firstMessage, secondMessage] = translatedMessage.split(';')

  const extendedBody = (
    <>
      <Box>{firstMessage}</Box>
      <Box sx={styles.secondMessage}>{secondMessage}</Box>
    </>
  )

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={handleClose}
      open={isOpened}
    >
      <Alert
        action={isExtended && actionButton}
        severity={severity}
        sx={styles.alert}
        variant='filled'
      >
        {isExtended ? extendedBody : actionBody}
      </Alert>
    </Snackbar>
  )
}

export default AppSnackbar

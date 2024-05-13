import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { closeAlert, snackbarSelector } from '~/redux/features/snackbarSlice'
import { useTranslation } from 'react-i18next'

const AppSnackbar = () => {
  const { isOpened, message, duration, severity } =
    useAppSelector(snackbarSelector)

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const handleClose = () => dispatch(closeAlert())

  const translatedMessage =
    typeof message === 'string' ? t(message) : t(message.text, message.options)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={handleClose}
      open={isOpened}
    >
      <Alert severity={severity} sx={{ color: 'basic.white' }} variant='filled'>
        {translatedMessage.split(', ').map((line) => (
          <Box key={line}>{line}</Box>
        ))}
      </Alert>
    </Snackbar>
  )
}

export default AppSnackbar

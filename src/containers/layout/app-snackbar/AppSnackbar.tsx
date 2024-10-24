import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

import { closeAlert, snackbarSelector } from '~/redux/features/snackbarSlice'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

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

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={duration}
      onClose={handleClose}
      open={isOpened}
    >
      <Alert
        action={
          isExtended && (
            <Box
              onClick={handleButtonClick}
              sx={{ p: '4px 8px 0 30px', cursor: 'pointer' }}
            >
              {t('offerPage.createOffer.seeAll')}
            </Box>
          )
        }
        severity={severity}
        sx={{ color: 'basic.white' }}
        variant='filled'
      >
        {isExtended ? (
          <>
            <Box>{translatedMessage.split(';')[0]}</Box>
            <Box sx={{ fontSize: '12px', fontWeight: '300' }}>
              {translatedMessage.split(';')[1]}
            </Box>
          </>
        ) : (
          translatedMessage
            .split(', ')
            .map((line) => <Box key={line}>{line}</Box>)
        )}
      </Alert>
    </Snackbar>
  )
}

export default AppSnackbar

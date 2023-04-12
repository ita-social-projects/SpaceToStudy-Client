import { t } from 'i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TurnedIn from '@mui/icons-material/TurnedIn'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/components/offer-card/offer-actions/OfferActions.styles'

const OfferActions = ({ price, isBookmarked, onBookmarkClick }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.containerTop}>
        <Box>
          <Typography variant='h6'>
            {price} {t('common.uah')}
          </Typography>
          <Typography variant='body2'>/{t('common.hour')}</Typography>
        </Box>

        <IconButton onClick={onBookmarkClick} sx={styles.bookmarkButton}>
          {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
        </IconButton>
      </Box>

      <AppButton sx={styles.sendMessageButton}>
        {t('common.labels.sendMessage')}
      </AppButton>
      <AppButton sx={styles.viewDetailsButton}>
        {t('common.labels.viewDetails')}
      </AppButton>
    </Box>
  )
}

export default OfferActions

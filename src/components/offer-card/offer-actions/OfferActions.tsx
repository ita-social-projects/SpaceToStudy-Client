import { FC } from 'react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TurnedIn from '@mui/icons-material/TurnedIn'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import AppButton from '~/components/app-button/AppButton'

import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/components/offer-card/offer-actions/OfferActions.styles'
import { VariantEnum } from '~/types'

interface OfferActionsProps {
  id: string
  price: number
  isBookmarked: boolean
  onBookmarkClick: (id: string) => void
}

const OfferActions: FC<OfferActionsProps> = ({
  id,
  price,
  isBookmarked,
  onBookmarkClick
}) => {
  const viewDetailsLink = `${authRoutes.offerDetails.path}/${id}`

  return (
    <Box>
      <Box sx={styles.containerTop}>
        <Box>
          <Typography variant='h6'>
            {price} {t('common.uah')}
          </Typography>
          <Typography variant='body2'>/{t('common.hour')}</Typography>
        </Box>

        <IconButton
          data-testid='iconButton'
          onClick={() => onBookmarkClick(id)}
          sx={styles.bookmarkButton}
        >
          {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
        </IconButton>
      </Box>

      <Box sx={styles.buttons}>
        <AppButton sx={styles.button} variant={VariantEnum.Contained}>
          {t('common.labels.sendMessage')}
        </AppButton>
        <AppButton
          component={Link}
          fullWidth
          sx={styles.button}
          to={viewDetailsLink}
          variant={VariantEnum.Tonal}
        >
          {t('common.labels.viewDetails')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default OfferActions

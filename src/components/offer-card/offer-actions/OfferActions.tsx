import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TurnedIn from '@mui/icons-material/TurnedIn'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import AppButton from '~/components/app-button/AppButton'

import { styles } from '~/components/offer-card/offer-actions/OfferActions.styles'
import { ButtonActions } from '~/types'

interface OfferActionsProps {
  id: string
  price: number
  isBookmarked: boolean
  onBookmarkClick: (id: string) => void
  buttonActions: (ButtonActions | null)[]
}

const OfferActions: FC<OfferActionsProps> = ({
  id,
  price,
  isBookmarked,
  onBookmarkClick,
  buttonActions
}) => {
  const { t } = useTranslation()

  const buttons = buttonActions.map(
    (elem) =>
      elem && (
        <AppButton fullWidth key={elem.label} {...elem.buttonProps}>
          {t(elem.label)}
        </AppButton>
      )
  )

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

      <Box sx={styles.buttons}>{buttons}</Box>
    </Box>
  )
}

export default OfferActions

import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { RatingProps } from '@mui/material/Rating'

import { styles } from '~/components/app-rating-mobile/AppRatingMobile.styles'

interface AppRatingMobileProps extends RatingProps {
    reviewsCount: number
}

const AppRatingMobile:FC<AppRatingMobileProps> = ({ value, reviewsCount }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.root }>
      <Box data-testid='number-box' sx={ styles.number }>
        <StarSharp data-testid='star-icon' sx={ styles.starMobile } />
        <Typography variant={ 'h6' }  >
          { value }
        </Typography>
      </Box>
      <Typography variant={ 'caption' }>
        { t('tutorProfilePage.reviews.reviewsCount',{ count: reviewsCount }) }
      </Typography>
    </Box>
  )
}

export default AppRatingMobile

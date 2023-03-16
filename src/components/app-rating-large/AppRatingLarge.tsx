import { FC } from 'react'

import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { RatingProps } from '@mui/material/Rating'


import AppRating from '~/components/app-rating/AppRating'
import { styles } from '~/components/app-rating-large/AppRatingLarge.styles'

interface AppRatingLargeProps extends RatingProps {
    mobile? : boolean
    reviewsCount: number
}

const AppRatingLarge:FC<AppRatingLargeProps> = ({ value, mobile = false, reviewsCount, ...ratingProps }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ styles.root }>
      <Box data-testid='number-box' sx={ styles.number }>
        { mobile && <StarSharp data-testid='star-icon' sx={ styles.starMobile } /> }
        <Typography variant={ mobile ? 'h6' : 'h4' }  >
          { value }
        </Typography>
      </Box>
      { !mobile && <AppRating value={ value } { ...ratingProps } /> }
      <Typography variant={ mobile ? 'caption' : 'body1' }>
        { t('tutorProfilePage.reviews.reviewsCount',{ count: reviewsCount }) }
      </Typography>
    </Box>
  )
}

export default AppRatingLarge

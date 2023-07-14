import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import { styles } from '~/components/app-rating-large/AppRatingLarge.styles'
import AppRating from '~/components/app-rating/AppRating'

const AppRatingLarge = ({ value, reviewsCount, ...ratingProps }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box data-testid='number-box' sx={styles.number}>
        <Typography variant={'h4'}>{value}</Typography>
      </Box>
      <AppRating value={value} {...ratingProps} />
      <Typography variant={'body1'}>
        {t('tutorProfilePage.reviews.reviewsCount', { count: reviewsCount })}
      </Typography>
    </Box>
  )
}

export default AppRatingLarge

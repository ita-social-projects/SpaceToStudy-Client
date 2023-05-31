import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'

import AppRating from '~/components/app-rating/AppRating'

import { styles } from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating.styles'

const OfferAvatarAndRating = ({ imgSrc, rating, name, totalReviews }) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.container}>
      <Avatar src={imgSrc} sx={styles.avatar} />
      <Typography sx={styles.name}>{name}</Typography>
      <AppRating readOnly showNumber sx={styles.rating} value={rating} />
      <Typography sx={styles.reviews} variant={'caption'}>
        {t('tutorProfilePage.reviews.reviewsCount', {
          count: totalReviews
        })}
      </Typography>
    </Box>
  )
}

export default OfferAvatarAndRating

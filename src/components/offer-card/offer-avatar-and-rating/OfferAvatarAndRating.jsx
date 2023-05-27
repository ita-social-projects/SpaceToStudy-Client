import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import AppRating from '~/components/app-rating/AppRating'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'

import { styles } from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating.styles'


const OfferAvatarAndRating = ({ imgSrc, rating, totalReviews }) => {
  return (
    <Box sx={styles.container}>
      <Avatar src={imgSrc} sx={styles.avatar} />
      <AppRating readOnly showNumber sx={styles.rating} value={rating} />
      <Box sx={styles.reviewsCountContainer}>
        <Box sx={styles.reviewsCountContent}>
          <AppRatingMobile reviewsCount={totalReviews} hideStar={true} />
        </Box>
      </Box>
    </Box>
  );
}

export default OfferAvatarAndRating

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'

import AppRating from '~/components/app-rating/AppRating'

import { styles } from '~/components/offer-card/offer-avatar-and-rating/OfferAvatarAndRating.styles'

const OfferAvatarAndRating = ({ imgSrc, rating }) => {
  return (
    <Box sx={styles.container}>
      <Avatar src={imgSrc} sx={styles.avatar} />
      <AppRating disabled showNumber sx={styles.rating} value={rating} />
    </Box>
  )
}

export default OfferAvatarAndRating

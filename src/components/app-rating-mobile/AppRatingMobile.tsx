import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { RatingProps } from '@mui/material/Rating'
import { SxProps } from '@mui/material'

import HashLink from '~/components/hash-link/HashLink'
import { spliceSx } from '~/utils/helper-functions'

import { styles } from '~/components/app-rating-mobile/AppRatingMobile.styles'

interface AppRatingMobileProps extends RatingProps {
  reviewsCount: number
  link?: string
  sx?: {
    starMobile?: SxProps
    reviews?: SxProps
    rating?: SxProps
  }
}

const AppRatingMobile: FC<AppRatingMobileProps> = ({
  value,
  reviewsCount,
  link,
  sx
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box data-testid='number-box' sx={styles.number}>
        <StarSharp
          data-testid='star-icon'
          sx={spliceSx(styles.starMobile, sx?.starMobile)}
        />
        <Typography sx={spliceSx(styles.rating, sx?.rating)}>
          {value}
        </Typography>
      </Box>
      <Typography
        component={link ? HashLink : Typography}
        sx={spliceSx(styles.reviews, sx?.reviews)}
      >
        {t('tutorProfilePage.reviews.reviewsCount', {
          count: reviewsCount
        })}
      </Typography>
    </Box>
  )
}

export default AppRatingMobile

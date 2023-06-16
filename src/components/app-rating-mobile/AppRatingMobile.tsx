import { FC, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import StarSharp from '@mui/icons-material/StarSharp'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { RatingProps } from '@mui/material/Rating'

import { styles } from '~/components/app-rating-mobile/AppRatingMobile.styles'

interface AppRatingMobileProps extends RatingProps {
  reviewsCount: number
  linkHash?: ReactElement
  style?: {
    variantOption?: string
    fontSize?: string
    starMobile?: object
    reviews?: object
    rating?: object
  }
}

const AppRatingMobile: FC<AppRatingMobileProps> = ({
  value,
  reviewsCount,
  linkHash,
  style
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.root}>
      <Box data-testid='number-box' sx={styles.number}>
        <StarSharp
          data-testid='star-icon'
          sx={style?.starMobile ? style?.starMobile : styles.starMobile}
        />
        <Typography sx={style?.rating} variant={'h6'}>
          {value}
        </Typography>
      </Box>
      <Typography
        component={linkHash}
        sx={style?.reviews}
        to={'#'}
        variant={style?.variantOption}
      >
        {t('tutorProfilePage.reviews.reviewsCount', {
          count: reviewsCount
        })}
      </Typography>
    </Box>
  )
}

export default AppRatingMobile

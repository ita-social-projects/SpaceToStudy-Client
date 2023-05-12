import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import AppRatingLarge from '~/components/app-rating-large/AppRatingLarge'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import useBreakpoints from '~/hooks/use-breakpoints'

import { RatingType } from '~/types'
import { styles } from '~/containers/tutor-profile/comments-with-rating-block/rating-block/RatingBlock.styles'

interface RatingBlockProps {
  setFilter: (filter: number | null) => void
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
  activeFilter: number | null
}

const RatingBlock: FC<RatingBlockProps> = ({
  setFilter,
  averageRating,
  totalReviews,
  reviewsCount,
  activeFilter
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()
  const ratings = reviewsCount.reduce((acc, { count, rating }) => {
    acc[rating] = count
    return acc
  }, Array<number>(6).fill(0))

  const resetFilters = () => setFilter(null)

  const progresBars = ratings
    .map((rating, idx: number) => {
      const starPercent = (rating / totalReviews) * 100
      const active = !activeFilter || activeFilter === idx
      const handleProgresBarClick = () => {
        if (rating) {
          setFilter(idx)
        }
      }
      const optionalStyles = {
        opacity: active ? 1 : '0.5',
        cursor: rating ? 'pointer' : 'default'
      }

      return (
        idx > 0 && (
          <Box
            data-testid={`progress-bar-${idx}`}
            key={idx}
            onClick={handleProgresBarClick}
            sx={[styles.progressBar, optionalStyles]}
          >
            <Typography sx={styles.typography}>
              {t('tutorProfilePage.reviews.starsCount', { count: idx })}
            </Typography>
            <LinearProgress
              sx={styles.linearProgress}
              value={starPercent}
              variant='determinate'
            />
            <Typography sx={styles.typography}>{rating}</Typography>
          </Box>
        )
      )
    })
    .reverse()

  const ratingComponent = isMobile ? (
    <AppRatingMobile reviewsCount={totalReviews} value={averageRating} />
  ) : (
    <AppRatingLarge
      readOnly
      reviewsCount={totalReviews}
      sx={styles.rating}
      value={averageRating}
    />
  )

  return (
    <Box sx={styles.root}>
      {ratingComponent}
      <Box sx={styles.progressBarRoot}>
        {progresBars}
        {activeFilter && (
          <Typography
            data-testid='reset-filter'
            onClick={resetFilters}
            sx={styles.resetButton}
          >
            {t('tutorProfilePage.reviews.buttonTitle')}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default RatingBlock

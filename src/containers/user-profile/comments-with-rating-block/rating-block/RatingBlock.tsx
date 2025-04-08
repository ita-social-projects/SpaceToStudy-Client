import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import AppRatingLarge from '~/components/app-rating-large/AppRatingLarge'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import useBreakpoints from '~/hooks/use-breakpoints'

import { type ReviewResponse } from '~/types'
import { styles } from '~/containers/user-profile/comments-with-rating-block/rating-block/RatingBlock.styles'

interface RatingBlockProps {
  setFilter: (filter: number | null) => void
  averageRating: number
  reviewCount: number
  reviews: ReviewResponse[]
  activeFilter: number | null
}

const RatingBlock: FC<RatingBlockProps> = ({
  setFilter,
  averageRating,
  reviewCount,
  reviews,
  activeFilter
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const ratingCounts = Array.from({ length: 6 }, () => 0)

  reviews.forEach(({ rating }) => {
    ratingCounts[rating] += 1
  })

  const resetFilters = () => setFilter(null)

  const createProgressBar = (rating: number, idx: number) => {
    if (idx === 0) {
      return null
    }

    const starPercent = reviewCount ? (rating / reviewCount) * 100 : 0
    const isActive = !activeFilter || activeFilter === idx

    const handleClick = () => {
      if (rating) {
        setFilter(idx)
      }
    }

    const dynamicStyles = {
      opacity: isActive ? 1 : 0.5,
      cursor: rating ? 'pointer' : 'default'
    }

    return (
      <Box
        data-testid={`progress-bar-${idx}`}
        key={idx}
        onClick={handleClick}
        sx={[styles.progressBar, dynamicStyles]}
      >
        <Typography sx={styles.typography}>
          {t('userProfilePage.reviews.starsCount', { count: idx })}
        </Typography>
        <LinearProgress
          sx={styles.linearProgress}
          value={starPercent}
          variant='determinate'
        />
        <Typography sx={styles.typography}>{rating}</Typography>
      </Box>
    )
  }

  const progressBars = ratingCounts.map(createProgressBar).reverse()

  const ratingComponent = isMobile ? (
    <AppRatingMobile reviewsCount={reviewCount} value={averageRating} />
  ) : (
    <AppRatingLarge
      readOnly
      reviewsCount={reviewCount}
      sx={styles.rating}
      value={averageRating}
    />
  )

  return (
    <Box sx={styles.root}>
      {ratingComponent}
      <Box sx={styles.progressBarRoot}>
        {progressBars}
        {activeFilter && (
          <Typography
            data-testid='reset-filter'
            onClick={resetFilters}
            sx={styles.resetButton}
          >
            {t('userProfilePage.reviews.buttonTitle')}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default RatingBlock

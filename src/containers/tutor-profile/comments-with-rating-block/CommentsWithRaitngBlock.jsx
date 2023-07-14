import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import RatingBlock from '~/containers/tutor-profile/comments-with-rating-block/rating-block/RatingBlock'
import CommentsBlock from '~/containers/tutor-profile/comments-block/CommentBlock'
import Loader from '~/components/loader/Loader'

import { RatingType } from '~/types'
import { styles } from '~/containers/tutor-profile/comments-with-rating-block/CommentsWithRatingBlock.styles'
import {
  responseMock,
  loadingMock
} from '~/containers/tutor-profile/comments-with-rating-block/constants'

interface CommentsWithRatingBlockProps {
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
}

const CommentsWithRatingBlock = ({
  averageRating,
  totalReviews,
  reviewsCount
}: CommentsWithRatingBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)

  const { t } = useTranslation()
  const { items } = responseMock

  const handleFilterChange = (value: number | null) => {
    if (value !== filter) {
      setFilter(value)
    }
  }

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('tutorProfilePage.reviews.title')}
      </Typography>
      {loadingMock && !items.length ? (
        <Loader />
      ) : (
        <>
          <RatingBlock
            activeFilter={filter}
            averageRating={averageRating}
            reviewsCount={reviewsCount}
            setFilter={handleFilterChange}
            totalReviews={totalReviews}
          />
          <CommentsBlock
            data={items}
            isExpandable
            loadMore={() => null}
            loading={loadingMock}
          />
        </>
      )}
    </Box>
  )
}

export default CommentsWithRatingBlock

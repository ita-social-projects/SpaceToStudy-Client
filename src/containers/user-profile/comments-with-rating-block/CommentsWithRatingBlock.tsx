import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import RatingBlock from '~/containers/user-profile/comments-with-rating-block/rating-block/RatingBlock'
import CommentsBlock from '~/containers/user-profile/comments-block/CommentBlock'
import Loader from '~/components/loader/Loader'
import { RatingType } from '~/types'
import { styles } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.styles'
import {
  responseMock,
  loadingMock
} from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { ListItemText, MenuItem, Select } from '@mui/material'
import { SortByEnum } from '~/types'

interface CommentsWithRatingBlockProps {
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
  labels?: ReadonlyMap<SortByEnum, string>
  value: SortByEnum[]
}

const CommentsWithRatingBlock = ({
  averageRating,
  totalReviews,
  reviewsCount,
  labels
}: CommentsWithRatingBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)

  const { t } = useTranslation()
  const { items } = responseMock

  const sortItems = Object.values(SortByEnum)

  const sortMenuItems = sortItems.map((el) => (
    <MenuItem key={el} value={el}>
      <ListItemText
        primary={
          labels?.has(el)
            ? t(labels.get(el)!)
            : t(`userProfilePage.sortItems.${el}`)
        }
      />
    </MenuItem>
  ))

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('userProfilePage.reviews.title')}
      </Typography>
      {loadingMock && !items.length ? (
        <Loader />
      ) : (
        <>
          <RatingBlock
            activeFilter={filter}
            averageRating={averageRating}
            reviewsCount={reviewsCount}
            setFilter={setFilter}
            totalReviews={totalReviews}
          />

          <Box
            sx={{
              ...styles.root,
              gap: '80px',
              width: '100%',
              flexDirection: 'row',
              left: 0,
              justifyContent: 'flex-start'
            }}
          >
            <Box
              sx={{
                ...styles.root,
                flexDirection: 'row',
                gap: '8px',
                maxWidth: '250px'
              }}
            >
              <Typography>Sort by:</Typography>
              <Select defaultValue={'Newest'}>{sortMenuItems}</Select>
            </Box>

            <Box sx={{ ...styles.root, flexDirection: 'row', gap: '8px' }}>
              <Typography>Filter by:</Typography>
              <Select defaultValue={5}>
                <MenuItem value={5}>5 stars</MenuItem>
                <MenuItem value={4}>4 stars</MenuItem>
                <MenuItem value={3}>3 stars</MenuItem>
                <MenuItem value={2}>2 stars</MenuItem>
                <MenuItem value={1}>1 star</MenuItem>
              </Select>
            </Box>
          </Box>

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

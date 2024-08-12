import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RatingBlock from '~/containers/user-profile/comments-with-rating-block/rating-block/RatingBlock'
import CommentsBlock from '~/containers/user-profile/comments-block/CommentBlock'
import Loader from '~/components/loader/Loader'
import { RatingType, SortByEnum } from '~/types'
import { styles } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.styles'
import {
  responseMock,
  loadingMock
} from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { ListItemText, MenuItem, Select } from '@mui/material'

interface CommentsWithRatingBlockProps {
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
  labels?: ReadonlyMap<SortByEnum, string>
}

const CommentsWithRatingBlock = ({
  averageRating,
  totalReviews,
  reviewsCount,
  labels
}: CommentsWithRatingBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.Newest)
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

  const ratingOptions = [5, 4, 3, 2, 1]

  const ratingMenuItems = ratingOptions.map((rating) => (
    <MenuItem key={rating} value={rating}>
      {t('userProfilePage.reviews.starsCount', {
        count: rating,
        defaultValue: '{{count}} stars'
      })}
    </MenuItem>
  ))

  const filteredItems = items.filter((item) => {
    if (filter !== null) {
      return item.rating === filter
    }
    return true
  })

  const sortedItems = filteredItems.sort((a, b) => {
    switch (sortBy) {
      case SortByEnum.Newest:
        return new Date().getTime() - new Date().getTime()
      case SortByEnum.Relevant:
        return new Date().getTime() - new Date().getTime()
      case SortByEnum.highestRating:
        return b.rating - a.rating
      case SortByEnum.lowestRating:
        return a.rating - b.rating
      default:
        return 0
    }
  })

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

          <Box sx={styles.container}>
            <Box sx={styles.innerBox}>
              <Typography>{t('common.labels.sortBy')}</Typography>
              <Select
                defaultValue={SortByEnum.Newest}
                onChange={(e) => {
                  const value = e.target.value
                  if (Object.values(SortByEnum).includes(value as SortByEnum)) {
                    setSortBy(value as SortByEnum)
                  }
                }}
              >
                {sortMenuItems}
              </Select>
            </Box>

            <Box sx={styles.innerBox}>
              <Typography>{t('common.labels.filterBy')}</Typography>
              <Select
                defaultValue={5}
                onChange={(e) =>
                  setFilter(
                    e.target.value === '' ? null : Number(e.target.value)
                  )
                }
                value={filter ?? 5}
              >
                {ratingMenuItems}
              </Select>
            </Box>
          </Box>

          <CommentsBlock
            data={sortedItems}
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

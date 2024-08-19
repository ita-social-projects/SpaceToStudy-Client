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
import { SelectChangeEvent } from '@mui/material/Select'

interface CommentsWithRatingBlockProps {
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
  labels?: ReadonlyMap<SortByEnum, string>
  setFilter: (value: number | null) => void
  setSortBy: (value: SortByEnum) => void
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

  const toSorted = [...filteredItems]

  const sortedItems = toSorted.sort((a, b) => {
    switch (sortBy) {
      case SortByEnum.Newest:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case SortByEnum.Relevant:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case SortByEnum.highestRating:
        return b.rating - a.rating
      case SortByEnum.lowestRating:
        return a.rating - b.rating
      default:
        return 0
    }
  })

  const handleSortChange = (event: SelectChangeEvent<SortByEnum>) => {
    const value = event.target.value as SortByEnum
    setSortBy(value)
  }

  const handleFilterChange = (event: SelectChangeEvent<SortByEnum>) => {
    const value = event.target.value as SortByEnum | ''
    setFilter(value === '' ? null : Number(value))
  }

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
            data-testid='rating-block'
            reviewsCount={reviewsCount}
            setFilter={setFilter}
            totalReviews={totalReviews}
          />

          <Box sx={styles.container}>
            <Box sx={styles.innerBox}>
              <Typography>{t('common.labels.sortBy')}</Typography>
              <Select
                data-testid='sort-select'
                defaultValue={SortByEnum.Newest}
                onChange={handleSortChange}
              >
                {sortMenuItems}
              </Select>
            </Box>

            <Box sx={styles.innerBox}>
              <Typography>{t('common.labels.filterBy')}</Typography>
              <Select
                data-testid='filter-select'
                defaultValue={SortByEnum.highestRating}
                onChange={handleFilterChange}
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

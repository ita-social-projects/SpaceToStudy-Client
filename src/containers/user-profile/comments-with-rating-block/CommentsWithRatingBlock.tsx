import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import RatingBlock from '~/containers/user-profile/comments-with-rating-block/rating-block/RatingBlock'
import CommentsBlock from '~/containers/user-profile/comments-block/CommentBlock'
import Loader from '~/components/loader/Loader'
import { ReviewsResponse, SortByEnum, UserRoleEnum } from '~/types'
import { styles } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.styles'
import {
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { ReviewService } from '~/services/review-service'
import useQuery from '~/hooks/use-query'

interface CommentsWithRatingBlockProps {
  averageRating: number
  labels?: ReadonlyMap<SortByEnum, string>
  userRole: UserRoleEnum
  userId: string
}

const CommentsWithRatingBlock = ({
  averageRating,
  labels,
  userRole,
  userId
}: CommentsWithRatingBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<SortByEnum>(SortByEnum.Newest)
  const { t } = useTranslation()

  const titleKey =
    userRole === UserRoleEnum.Tutor
      ? 'userProfilePage.reviews.titleTutor'
      : 'userProfilePage.reviews.titleStudent'

  const getReviews = useCallback(
    () => ReviewService.getUserReviews({ userId: userId, userRole: userRole }),
    [userId, userRole]
  )

  const { data, isLoading } = useQuery<ReviewsResponse>({
    queryFn: getReviews,
    queryKey: [['reviews', userId, userRole]],
    options: {
      staleTime: Infinity
    }
  })

  const reviews = data?.reviews || []
  const reviewCount = data?.count || 0

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

  const filteredItems = reviews.filter(
    (item) => filter === null || item.rating === filter
  )

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case SortByEnum.Newest:
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

  const handleSortChange = (event: SelectChangeEvent<SortByEnum>) =>
    setSortBy(event.target.value as SortByEnum)
  const handleFilterChange = (event: SelectChangeEvent<number>) =>
    setFilter(event.target.value === '' ? null : Number(event.target.value))

  return (
    <Box id={'reviewSection'} sx={styles.root}>
      <Typography sx={styles.title}>{t(titleKey)}</Typography>
      {isLoading && reviewCount ? (
        <Loader data-testid='loader' />
      ) : (
        <>
          <RatingBlock
            activeFilter={filter}
            averageRating={averageRating}
            data-testid='rating-block'
            reviewCount={reviewCount}
            reviews={reviews}
            setFilter={setFilter}
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
                defaultValue={5}
                onChange={handleFilterChange}
                value={filter ?? 5}
              >
                {ratingMenuItems}
              </Select>
            </Box>
          </Box>
          <CommentsBlock
            data={sortedItems}
            data-testid='comments-block'
            isExpandable
            loadMore={() => null}
            loading={isLoading}
          />
        </>
      )}
    </Box>
  )
}

export default CommentsWithRatingBlock

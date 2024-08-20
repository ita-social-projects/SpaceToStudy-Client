import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import RatingBlock from '~/containers/user-profile/comments-with-rating-block/rating-block/RatingBlock'
import CommentsBlock from '~/containers/user-profile/comments-block/CommentBlock'
import Loader from '~/components/loader/Loader'
import { RatingType, SortByEnum, UserRoleEnum } from '~/types'
import { styles } from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.styles'
import {
  responseMock,
  loadingMock,
  responseMockStudents,
  MockReview
} from '~/containers/user-profile/comments-with-rating-block/CommentsWithRatingBlock.constants'
import { ListItemText, MenuItem, Select } from '@mui/material'

interface CommentsWithRatingBlockProps {
  averageRating: number
  totalReviews: number
  reviewsCount: RatingType[]
  labels?: ReadonlyMap<SortByEnum, string>
  userRole: UserRoleEnum
}

const CommentsWithRatingBlock = ({
  averageRating,
  totalReviews,
  reviewsCount,
  labels,
  userRole
}: CommentsWithRatingBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)
  const { t } = useTranslation()

  const titleKey =
    userRole === UserRoleEnum.Tutor
      ? 'userProfilePage.reviews.titleTutor'
      : 'userProfilePage.reviews.titleStudent'

  const { items }: { items: MockReview[] } =
    userRole === UserRoleEnum.Tutor ? responseMock : responseMockStudents

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

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{t(titleKey)}</Typography>
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
              <Select defaultValue={SortByEnum.Newest}>{sortMenuItems}</Select>
            </Box>

            <Box sx={styles.innerBox}>
              <Typography>{t('common.labels.filterBy')}</Typography>
              <Select defaultValue={5}>{ratingMenuItems}</Select>
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

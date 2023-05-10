import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import { SxProps } from '@mui/material'

import Comment from '~/components/comment/Comment'
import RatingBlock from '~/containers/tutor-profile/coments-block/rating-block/RatingBlock'
import AppButton from '~/components/app-button/AppButton'
import Loader from '~/components/loader/Loader'

import { RatingType, SizeEnum, VariantEnum } from '~/types'
import { styles } from '~/containers/tutor-profile/coments-block/ComentsBlock.styles'
import {
  responseMock,
  loadingMock,
  commentsCount
} from '~/containers/tutor-profile/coments-block/constants'

interface ComentsBlockProps {
  titleStyles?: SxProps
  commentListStyles?: SxProps
  averageRating?: number
  totalReviews: number
  reviewsCount: RatingType[]
}

const ComentsBlock = ({
  titleStyles,
  commentListStyles,
  averageRating,
  totalReviews,
  reviewsCount
}: ComentsBlockProps) => {
  const [filter, setFilter] = useState<number | null>(null)
  const [amountToShow, setAmountToShow] = useState<number>(
    commentsCount.default
  )
  const { t } = useTranslation()
  const { count, items } = responseMock

  const itemsList = (
    <Box sx={{ ...styles.commentList, ...commentListStyles }}>
      {items.map((review) => (
        <Comment key={review._id} review={review} />
      ))}
    </Box>
  )

  const handleShowMoreComments = () => {
    setAmountToShow((prev) => prev + commentsCount.increment)
  }

  const handleFilterChange = (value: number | null) => {
    if (value !== filter) {
      setFilter(value)
    }
  }

  const showMoreButton = count > amountToShow && (
    <AppButton
      endIcon={!loadingMock && <KeyboardArrowDownSharpIcon />}
      loading={loadingMock && items.length}
      onClick={handleShowMoreComments}
      size={SizeEnum.Large}
      sx={styles.button}
      variant={VariantEnum.Contained}
    >
      {t('tutorProfilePage.reviews.buttonTitle')}
    </AppButton>
  )

  return (
    <Box sx={styles.root}>
      <Typography sx={{ ...styles.title, ...titleStyles }}>
        {t('tutorProfilePage.reviews.title')}
      </Typography>
      {loadingMock && !items.length ? (
        <Loader size={70} />
      ) : (
        <>
          {averageRating && (
            <RatingBlock
              activeFilter={filter}
              averageRating={averageRating}
              reviewsCount={reviewsCount}
              setFilter={handleFilterChange}
              totalReviews={totalReviews}
            />
          )}
          {itemsList}
          {showMoreButton}
        </>
      )}
    </Box>
  )
}

export default ComentsBlock

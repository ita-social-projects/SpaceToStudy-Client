import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'

import Comment from '~/components/comment/Comment'
import AppButton from '~/components/app-button/AppButton'

import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/user-profile/comments-block/CommentsBlock.styles'

export interface MockResponseItem {
  _id: string
  comment: string
  rating: number
  author: {
    _id: string
    role: string[]
    firstName: string
    lastName: string
    photo: string
    email: string
    categories: never[]
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  targetUserId: string
  targetUserRole: string
  offer: {
    _id: string
    price: number
    proficiencyLevel: string[]
    description: string
    languages: string[]
    authorRole: string
    userId: string
    subject: { _id: string; name: string }
    category: { _id: string; name: string }
    createdAt: string
    updatedAt: string
    __v: number
  }
  createdAt: string
  updatedAt: string
  __v: number
}

interface ComentsBlockProps {
  title?: string
  data: MockResponseItem[]
  loading: boolean
  loadMore: () => void
  isExpandable: boolean
}

const ComentsBlock = ({
  title,
  data,
  loading,
  loadMore,
  isExpandable
}: ComentsBlockProps) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const itemsList = (
    <Box sx={styles.commentList}>
      {data.map((review) => (
        <Comment key={review._id} review={review} />
      ))}
    </Box>
  )

  const showMoreButton = isExpandable && (
    <AppButton
      disabled
      endIcon={!loading && <KeyboardArrowDownSharpIcon />}
      fullWidth={isMobile}
      loading={loading}
      onClick={loadMore}
      sx={styles.button}
    >
      {t('userProfilePage.reviews.buttonTitle')}
    </AppButton>
  )

  return (
    <Box data-testid='comment-item' sx={styles.root}>
      {title && <Typography sx={styles.title}>{title}</Typography>}
      {itemsList}
      {showMoreButton}
    </Box>
  )
}

export default ComentsBlock

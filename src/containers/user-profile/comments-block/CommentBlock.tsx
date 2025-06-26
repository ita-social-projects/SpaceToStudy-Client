import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'

import Comment from '~/components/comment/Comment'
import Button from '~scss-components/button/Button'

import useBreakpoints from '~/hooks/use-breakpoints'
import { type ReviewResponse } from '~/types'

import { styles } from '~/containers/user-profile/comments-block/CommentsBlock.styles'

interface CommentsBlockProps {
  title?: string
  data: ReviewResponse[]
  loading: boolean
  loadMore: () => void
  isExpandable: boolean
}

const CommentsBlock: React.FC<CommentsBlockProps> = ({
  title,
  data,
  loading,
  loadMore,
  isExpandable
}) => {
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
    <Button
      disabled
      endIcon={!loading && <KeyboardArrowDownSharpIcon />}
      fullWidth={isMobile}
      loading={loading}
      onClick={loadMore}
      sx={styles.button}
    >
      {t('userProfilePage.reviews.moreReviews')}
    </Button>
  )

  return (
    <Box data-testid='comment-item' sx={styles.root}>
      {title && <Typography sx={styles.title}>{title}</Typography>}
      {itemsList}
      {showMoreButton}
    </Box>
  )
}

export default CommentsBlock

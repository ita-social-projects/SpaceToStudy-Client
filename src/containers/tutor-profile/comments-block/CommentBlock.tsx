import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'

import Comment from '~/components/comment/Comment'
import AppButton from '~/components/app-button/AppButton'

import useBreakpoints from '~/hooks/use-breakpoints'
import { Offer } from '~/types'
import { styles } from '~/containers/tutor-profile/comments-block/CommentsBlock.styles'

interface ComentsBlockProps {
  title?: string
  data: Offer[]
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
      {t('tutorProfilePage.reviews.buttonTitle')}
    </AppButton>
  )

  return (
    <Box sx={styles.root}>
      {title && <Typography sx={styles.title}>{title}</Typography>}
      {itemsList}
      {showMoreButton}
    </Box>
  )
}

export default ComentsBlock

import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'

import Comment from '~/components/comment/Comment'
import AppButton from '~/components/app-button/AppButton'

import { Offer, SizeEnum, VariantEnum } from '~/types'
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

  const itemsList = (
    <Box sx={styles.commentList}>
      {data.map((review) => (
        <Comment key={review._id} review={review} />
      ))}
    </Box>
  )

  const showMoreButton = isExpandable && (
    <AppButton
      endIcon={!loading && <KeyboardArrowDownSharpIcon />}
      loading={loading}
      onClick={loadMore}
      size={SizeEnum.Large}
      sx={styles.button}
      variant={VariantEnum.Contained}
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

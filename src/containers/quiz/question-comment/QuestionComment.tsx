import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import { IconButton } from '~/design-system/components/icon-button/IconButton'
import { createUrlPath } from '~/utils/helper-functions'
import type { Quiz, UserResponse } from '~/types'
import styles from '~/containers/quiz/question-comment/QuestionComment.styles'

interface QuestionCommentProps {
  quiz: Omit<Quiz, 'author'> & {
    author: Pick<UserResponse, '_id' | 'firstName' | 'lastName' | 'photo'>
  }
  onCommentSubmit: (comment: string) => void
}

const QuestionComment: React.FC<QuestionCommentProps> = ({
  quiz,
  onCommentSubmit
}) => {
  const [comment, setComment] = useState('')
  const [isCommentOpen, setIsCommentOpen] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
    setIsSent(false)
  }

  const handleSubmit = () => {
    if (comment.trim()) {
      onCommentSubmit(comment)
      setIsSent(true)
    }
  }

  const toggleCommentField = () => {
    setIsCommentOpen((prev) => !prev)
  }

  const photo = quiz.author.photo
    ? createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, quiz.author.photo)
    : undefined

  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <IconButton
        aria-label={t('quiz.addComment')}
        onClick={toggleCommentField}
        sx={styles.commentIcon}
      >
        <AddCommentOutlinedIcon />
      </IconButton>
      {isCommentOpen && (
        <Box sx={styles.container}>
          <Typography aria-label={t('quiz.comment')} sx={styles.title}>
            {t('quiz.comment')}
          </Typography>
          <Box sx={styles.inputWrapper}>
            <AvatarIcon
              firstName={quiz.author.firstName}
              lastName={quiz.author.lastName}
              photo={photo}
              sx={styles.avatarIcon}
            />
            <TextField
              aria-label={t('quiz.writeComment')}
              data-testid='textField'
              multiline
              onChange={handleInputChange}
              placeholder={t('quiz.writeComment')}
              rows={1}
              sx={styles.textField}
              value={comment}
              variant='outlined'
            />
            <IconButton
              aria-label={t('quiz.submitComment')}
              disabled={!comment.trim()}
              onClick={handleSubmit}
              sx={styles.sendIcon(isSent)}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default QuestionComment

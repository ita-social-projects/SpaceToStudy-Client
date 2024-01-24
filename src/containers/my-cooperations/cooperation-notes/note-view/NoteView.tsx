import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LockIcon from '@mui/icons-material/Lock'

import { useAppSelector } from '~/hooks/use-redux'
import { getFormattedDate } from '~/utils/helper-functions'
import AppTextField from '~/components/app-text-field/AppTextField'

import { styles } from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView.styles'
import {
  TypographyVariantEnum,
  NoteResponse,
  TextFieldVariantEnum,
  SizeEnum
} from '~/types'

interface NoteViewProps {
  note: NoteResponse
}

const NoteView = ({ note }: NoteViewProps) => {
  const { userId } = useAppSelector((state) => state.appMain)
  const isCurrentUser = userId === note.author._id
  const date = getFormattedDate({ date: note.updatedAt })

  return (
    <Box sx={styles.container(isCurrentUser, note.isPrivate)}>
      <Box sx={styles.header}>
        <Box sx={styles.header}>
          <Avatar
            src={
              note.author.photo &&
              `${import.meta.env.VITE_APP_IMG_USER_URL}${note.author.photo}`
            }
          />
          <Box>
            <Typography variant={TypographyVariantEnum.Subtitle2}>
              {`${note.author.firstName} ${note.author.lastName}`}
            </Typography>
            <Typography
              sx={styles.date}
              variant={TypographyVariantEnum.Caption}
            >
              {date}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.header}>
          {note.isPrivate && (
            <LockIcon fontSize={SizeEnum.Small} sx={styles.lockIcon} />
          )}
          {isCurrentUser && (
            <IconButton>
              <MoreVertIcon fontSize={SizeEnum.Small} />
            </IconButton>
          )}
        </Box>
      </Box>
      <AppTextField
        InputLabelProps={styles.descriptionLabel}
        InputProps={styles.descriptionInput}
        fullWidth
        inputProps={styles.input}
        multiline
        sx={styles.textfield}
        value={note.text}
        variant={TextFieldVariantEnum.Standard}
      />
    </Box>
  )
}

export default NoteView

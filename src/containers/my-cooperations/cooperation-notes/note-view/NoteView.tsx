import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LockIcon from '@mui/icons-material/Lock'
import EditIcon from '@mui/icons-material/Edit'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { useAppSelector } from '~/hooks/use-redux'
import useMenu from '~/hooks/use-menu'
import { getFormattedDate } from '~/utils/helper-functions'
import AppTextField from '~/components/app-text-field/AppTextField'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import {
  TypographyVariantEnum,
  NoteResponse,
  TextFieldVariantEnum,
  SizeEnum,
  TableActionFunc
} from '~/types'

import { styles } from '~/containers/my-cooperations/cooperation-notes/note-view/NoteView.styles'

interface NoteViewProps {
  note: NoteResponse
  updateItem: (id: string) => void
  deleteItem: (id: string) => void
  duplicateItem: (id: string) => void
}

const NoteView: FC<NoteViewProps> = ({
  note,
  updateItem,
  deleteItem,
  duplicateItem
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { userId } = useAppSelector((state) => state.appMain)

  const isCurrentUser = userId === note.author._id
  const date = getFormattedDate({ date: note.updatedAt })

  const onAction = async (actionFunc: TableActionFunc) => {
    closeMenu()
    await actionFunc(note._id)
  }

  const rowActions = [
    {
      id: 1,
      label: (
        <Box sx={styles.iconWrapper}>
          <EditIcon sx={styles.icon} />
          {` ${t('common.edit')}`}
        </Box>
      ),
      func: () => updateItem(note._id)
    },
    {
      id: 2,
      label: (
        <Box sx={styles.iconWrapper}>
          <ContentCopyIcon sx={styles.icon} />
          {` ${t('common.duplicate')}`}
        </Box>
      ),
      func: () => duplicateItem(note._id)
    },
    {
      id: 3,
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon sx={styles.deleteIcon} />
          {`${t('common.delete')}`}
        </Box>
      ),
      func: () => deleteItem(note._id)
    }
  ]

  const menuItems = rowActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  const editMenuItems = rowActions
    .filter((action) => action.id !== 2)
    .map(({ label, func, id }) => (
      <MenuItem key={id} onClick={() => void onAction(func)}>
        {label}
      </MenuItem>
    ))

  const userPhoto = note.author.photo
    ? new URL(note.author.photo, import.meta.env.VITE_APP_IMG_USER_URL).href
    : undefined
  const isNameValid = Boolean(note.author.firstName && note.author.lastName)
  const userName =
    isNameValid && `${note.author.firstName} ${note.author.lastName}`

  return (
    <Box sx={styles.container(isCurrentUser, note.isPrivate)}>
      <Box sx={styles.header}>
        <Box sx={styles.header}>
          <AvatarIcon
            firstName={note.author.firstName}
            lastName={note.author.lastName}
            photo={userPhoto}
            sx={styles.accountIcon}
          />
          <Box>
            <Typography variant={TypographyVariantEnum.Subtitle2}>
              {userName}
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
            <>
              <LockIcon fontSize={SizeEnum.Small} sx={styles.lockIcon} />
              <IconButton onClick={openMenu}>
                <MoreVertIcon fontSize={SizeEnum.Small} />
              </IconButton>
              {renderMenu(editMenuItems)}
            </>
          )}
          {isCurrentUser && !note.isPrivate && (
            <>
              <IconButton onClick={openMenu}>
                <MoreVertIcon fontSize={SizeEnum.Small} />
              </IconButton>
              {renderMenu(menuItems)}
            </>
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

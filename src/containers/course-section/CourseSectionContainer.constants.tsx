import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'

export const menuTypes = {
  resourcesMenu: 'resources',
  sectionMenu: 'section'
}

export const resourcesTypes = {
  lesson: {
    type: 'lesson',
    icon: ListAltIcon
  },
  quiz: {
    type: 'quiz',
    icon: NoteAltOutlinedIcon
  },
  attachment: {
    type: 'attachment',
    icon: null
  }
}

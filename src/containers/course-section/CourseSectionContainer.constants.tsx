import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'

export const menuTypes = {
  resourcesMenu: 'resources',
  sectionMenu: 'section'
}

export const resourcesData = {
  lesson: {
    resource: 'lessons',
    icon: ListAltIcon
  },
  quiz: {
    resource: 'quizzes',
    icon: NoteAltOutlinedIcon
  },
  attachment: {
    resource: 'attachments',
    icon: AttachFileIcon
  }
}

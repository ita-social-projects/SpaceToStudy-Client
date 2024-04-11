import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import { ResourcesTabsEnum as ResourcesTypes } from '~/types'

export const menuTypes = {
  resourcesMenu: 'resources',
  sectionMenu: 'section'
}

export const resourcesData = {
  lessons: {
    resource: ResourcesTypes.Lessons,
    icon: <ListAltIcon />
  },
  quizzes: {
    resource: ResourcesTypes.Quizzes,
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    resource: ResourcesTypes.Attachments,
    icon: <AttachFileIcon />
  }
}

export const resourceNavigationMap: Partial<Record<ResourcesTypes, string>> = {
  [ResourcesTypes.Lessons]: 'editLesson',
  [ResourcesTypes.Quizzes]: 'editQuiz'
}

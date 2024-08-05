import ListAltIcon from '@mui/icons-material/ListAlt'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'

import { ResourcesTabsEnum, ResourcesTypesEnum as ResourceType } from '~/types'

export const menuTypes = {
  resourcesMenu: 'resources',
  sectionMenu: 'section'
}

export const resourcesData = {
  lessons: {
    resourceTab: ResourcesTabsEnum.Lessons,
    icon: <ListAltIcon />
  },
  quizzes: {
    resourceTab: ResourcesTabsEnum.Quizzes,
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    resourceTab: ResourcesTabsEnum.Attachments,
    icon: <AttachFileIcon />
  }
}

export const resourceNavigationMap: Partial<Record<ResourceType, string>> = {
  [ResourceType.Lesson]: 'editLesson',
  [ResourceType.Quiz]: 'editQuiz'
}

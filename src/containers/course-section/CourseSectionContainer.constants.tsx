import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'

import { ResourcesTabsEnum, ResourcesTypesEnum as ResourceType } from '~/types'

export const menuTypes = {
  resourcesMenu: 'resources',
  sectionMenu: 'section'
}

export const resourcesData = {
  lessons: {
    resourceTab: ResourcesTabsEnum.Lessons,
    icon: <ArticleOutlinedIcon />
  },
  quizzes: {
    resourceTab: ResourcesTabsEnum.Quizzes,
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    resourceTab: ResourcesTabsEnum.Attachments,
    icon: <DescriptionOutlinedIcon />
  }
}

export const resourceNavigationMap: Partial<Record<ResourceType, string>> = {
  [ResourceType.Lesson]: 'editLesson',
  [ResourceType.Quiz]: 'editQuiz'
}

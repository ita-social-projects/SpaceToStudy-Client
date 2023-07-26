import { ReactElement } from 'react'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'

interface TabsData {
  [key: string]: {
    title: string
    content: ReactElement
    icon: ReactElement
  }
}
export const tabsData: TabsData = {
  lessons: {
    title: 'myResourcesPage.tabs.lessons',
    content: <LessonsContainer />,
    icon: <ArticleOutlinedIcon />
  },
  tests: {
    title: 'myResourcesPage.tabs.tests',
    content: <LessonsContainer />,
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    title: 'myResourcesPage.tabs.attachments',
    content: <LessonsContainer />,
    icon: <AttachFileIcon />
  }
}

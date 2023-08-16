import { ReactElement } from 'react'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'

import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import AttachmentsContainer from '~/containers/my-resources/attachments-container/AttachmentsContainer'
import TestsContainer from '~/containers/my-quizzes/QuizzesContainer'

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
  quizzes: {
    title: 'myResourcesPage.tabs.quizzes',
    content: <TestsContainer />,
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    title: 'myResourcesPage.tabs.attachments',
    content: <AttachmentsContainer />,
    icon: <AttachFileIcon />
  }
}

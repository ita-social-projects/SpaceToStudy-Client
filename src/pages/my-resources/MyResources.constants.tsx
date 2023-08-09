import { ReactElement } from 'react'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'

import AttachmentsContainer from '~/containers/my-resources/attachments-container/AttachmentsContainer'
import QuizzesContainer from '~/containers/my-quizzes/QuizzesContainer'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import QuestionsContainer from '~/containers/my-resources/questions-container/QuestionsContainer'

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
    content: <QuizzesContainer />,
    icon: <NoteAltOutlinedIcon />
  },
  questions: {
    title: 'myResourcesPage.tabs.questions',
    content: <QuestionsContainer />,
    icon: <QuizOutlinedIcon />
  },
  attachments: {
    title: 'myResourcesPage.tabs.attachments',
    content: <AttachmentsContainer />,
    icon: <AttachFileIcon />
  }
}

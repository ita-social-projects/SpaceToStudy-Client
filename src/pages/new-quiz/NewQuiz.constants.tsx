import { ReactElement } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SettingsIcon from '@mui/icons-material/Settings'

import EditQuizContainer from '~/containers/my-quizzes/edit-quiz-container/EditQuizContainer'
import ViewQuizContainer from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer'
import QuizSettingsContainer from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer'

interface TabsData {
  [key: string]: {
    title: string
    content: ReactElement
    icon: ReactElement
  }
}
export const tabsData: TabsData = {
  edit: {
    title: 'Edit',
    content: <EditQuizContainer />,
    icon: <EditIcon />
  },
  quizzes: {
    title: 'View',
    content: <ViewQuizContainer />,
    icon: <VisibilityIcon />
  },
  settings: {
    title: 'Settings',
    content: <QuizSettingsContainer />,
    icon: <SettingsIcon />
  }
}

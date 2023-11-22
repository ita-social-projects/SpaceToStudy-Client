import { Dispatch, ReactElement, SetStateAction } from 'react'
import { ButtonProps } from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SettingsIcon from '@mui/icons-material/Settings'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'
import ViewQuizContainer from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer'
import QuizSettingsContainer from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer'

import { CreateQuizParams, Question } from '~/types'

export interface QuizContentProps {
  title: string
  setTitle: Dispatch<SetStateAction<CreateQuizParams['title']>>
  description: string
  setDescription: Dispatch<SetStateAction<CreateQuizParams['description']>>
  questions: Question[]
  setQuestions: Dispatch<SetStateAction<Question[]>>
  category: string | null
  setCategory: Dispatch<SetStateAction<string | null>>
}

export interface QuizTabsData {
  [key: string]: {
    title: string
    content: (props: QuizContentProps) => ReactElement
    icon: ReactElement
    tabProps?: Omit<ButtonProps, 'onClick'>
  }
}
export const tabsData: QuizTabsData = {
  edit: {
    title: 'Edit',
    content: (props) => <CreateOrEditQuizContainer {...props} />,
    icon: <EditIcon />
  },
  quizzes: {
    title: 'View',
    content: (props) => <ViewQuizContainer {...props} />,
    icon: <VisibilityIcon />
  },
  settings: {
    title: 'Settings',
    content: (props) => <QuizSettingsContainer {...props} />,
    icon: <SettingsIcon />
  }
}

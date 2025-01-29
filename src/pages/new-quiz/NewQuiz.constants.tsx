import { Dispatch, ReactElement, SetStateAction } from 'react'
import { ButtonProps } from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SettingsIcon from '@mui/icons-material/Settings'

import CreateOrEditQuizContainer from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer'
import ViewQuizContainer from '~/containers/my-quizzes/view-quiz-container/ViewQuizContainer'
import QuizSettingsContainer from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer'

import {
  CreateQuizParams,
  Question,
  QuizSettings,
  QuizViewEnum,
  QuizTabsEnum,
  QuizTimeLimit,
  QuizAttempt,
  ResourcesTypesEnum
} from '~/types'

export interface QuizContentProps {
  data: {
    id?: string
    title: string
    description: string
    category: string | null
    items: Question[]
    resourceType: ResourcesTypesEnum
    isDuplicate?: boolean
    settings: QuizSettings
  }
  handleInputChange: (
    key: keyof Omit<CreateQuizParams, 'id' | 'isDuplicate'>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNonInputValueChange: <K extends keyof CreateQuizParams>(
    key: K,
    value: CreateQuizParams[K]
  ) => void
  handleSubmit: () => void
  setActiveTab: Dispatch<SetStateAction<QuizTabsEnum>>
  setMutations: (mutations: {
    fetchEditedQuiz: () => void
    fetchAddQuiz: () => void
  }) => void
}

export type QuizTabsData = {
  [key in QuizTabsEnum]: {
    title: string
    content: (props: QuizContentProps) => ReactElement
    icon: ReactElement
    tabProps?: Omit<ButtonProps, 'onClick'>
  }
}

export const tabsData: QuizTabsData = {
  [QuizTabsEnum.Edit]: {
    title: 'Edit',
    content: (props) => <CreateOrEditQuizContainer {...props} />,
    icon: <EditIcon />
  },
  [QuizTabsEnum.Quizzes]: {
    title: 'View',
    content: (props) => <ViewQuizContainer {...props} />,
    icon: <VisibilityIcon />
  },
  [QuizTabsEnum.Settings]: {
    title: 'Settings',
    content: (props) => <QuizSettingsContainer {...props} />,
    icon: <SettingsIcon />
  }
}

export const initialSettings = {
  view: QuizViewEnum.Scroll,
  pointValues: false,
  scoredResponses: false,
  correctAnswers: false,
  shuffle: false,
  timeLimit: QuizTimeLimit.NoLimit,
  attemptLimit: QuizAttempt.NoLimit
}

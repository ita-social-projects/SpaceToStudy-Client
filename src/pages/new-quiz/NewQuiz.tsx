import { useState } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TabNavigation from '~/components/tab-navigation/TabNavigation'

import {
  tabsData,
  initialSettings,
  QuizTabsData
} from '~/pages/new-quiz/NewQuiz.constants'
import { styles } from '~/pages/new-quiz/NewQuiz.styles'
import { Question, QuizSettings, QuizTabsEnum } from '~/types'

const NewQuiz = () => {
  const [activeTab, setActiveTab] = useState<QuizTabsEnum>(QuizTabsEnum.Edit)
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string | null>(null)
  const [settings, setSettings] = useState<QuizSettings>(initialSettings)

  const handleClick = (tab: QuizTabsEnum) => {
    setActiveTab(tab)
  }

  const props = {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    setQuestions,
    category,
    setCategory,
    settings,
    setSettings,
    setActiveTab
  }
  const tabContent = activeTab && tabsData[activeTab].content(props)

  tabsData[QuizTabsEnum.Quizzes].tabProps = {
    ...(questions.length === 0 && { disabled: true })
  }

  return (
    <PageWrapper sx={styles.container}>
      <TabNavigation<QuizTabsEnum, QuizTabsData>
        activeTab={activeTab}
        handleClick={handleClick}
        tabsData={tabsData}
      />
      {tabContent}
    </PageWrapper>
  )
}

export default NewQuiz

import { useState } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TabNavigation from '~/components/tab-navigation/TabNavigation'

import { tabsData } from '~/pages/new-quiz/NewQuiz.constants'
import { styles } from '~/pages/new-quiz/NewQuiz.styles'
import { Question } from '~/types'

const NewQuiz = () => {
  const [activeTab, setActiveTab] = useState<string>('edit')
  const [questions, setQuestions] = useState<Question[]>([])

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const props = { questions, setQuestions }
  const tabContent = activeTab && tabsData[activeTab].content(props)

  return (
    <PageWrapper sx={styles.container}>
      <TabNavigation
        activeTab={activeTab}
        handleClick={handleClick}
        tabsData={tabsData}
      />
      {tabContent}
    </PageWrapper>
  )
}

export default NewQuiz

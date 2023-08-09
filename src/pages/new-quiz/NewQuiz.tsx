import { useState } from 'react'

import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { tabsData } from '~/pages/new-quiz/NewQuiz.constants'
import { styles } from '~/pages/new-quiz/NewQuiz.styles'
import TabNavigation from '~/components/tab-navigation/TabNavigation'

const NewQuiz = () => {
  const [activeTab, setActiveTab] = useState<string>('edit')

  const handleClick = (tab: string) => {
    setActiveTab(tab)
  }

  const tabContent = activeTab && tabsData[activeTab].content

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

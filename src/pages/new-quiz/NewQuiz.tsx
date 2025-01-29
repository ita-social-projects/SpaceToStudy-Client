import { useState } from 'react'
import { useParams } from 'react-router-dom'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TabNavigation from '~/components/tab-navigation/TabNavigation'
import useForm from '~/hooks/use-form'

import {
  tabsData,
  initialSettings,
  QuizTabsData
} from '~/pages/new-quiz/NewQuiz.constants'
import { styles } from '~/pages/new-quiz/NewQuiz.styles'
import {
  Question,
  QuizTabsEnum,
  ResourcesTypesEnum,
  CreateQuizParams
} from '~/types'

const NewQuiz = () => {
  const { id } = useParams()

  const [activeTab, setActiveTab] = useState<QuizTabsEnum>(QuizTabsEnum.Edit)
  const [mutations, setMutations] = useState({
    fetchEditedQuiz: () => {},
    fetchAddQuiz: () => {}
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm({
      initialValues: {
        id: id || '',
        title: '',
        description: '',
        category: null,
        items: [] as Question[],
        resourceType: ResourcesTypesEnum.Quiz,
        isDuplicate: false,
        settings: initialSettings
      },
      onSubmit: () => {
        if (id) {
          mutations.fetchEditedQuiz()
        } else {
          mutations.fetchAddQuiz()
        }
      },
      submitWithData: true
    })

  const props = {
    data,
    handleInputChange,
    handleNonInputValueChange: handleNonInputValueChange as <
      K extends keyof CreateQuizParams
    >(
      key: K,
      value: CreateQuizParams[K]
    ) => void,
    handleSubmit,
    setActiveTab,
    setMutations
  }

  const handleClick = (tab: QuizTabsEnum) => {
    setActiveTab(tab)
  }

  const tabContent = activeTab && tabsData[activeTab].content(props)

  tabsData[QuizTabsEnum.Quizzes].tabProps = {
    ...(data.items.length === 0 && { disabled: true })
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

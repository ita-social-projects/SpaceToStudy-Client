import RuleIcon from '@mui/icons-material/Rule'
import ListIcon from '@mui/icons-material/List'
import ShortTextIcon from '@mui/icons-material/ShortText'

import { SizeEnum, QuestionTypesEnum } from '~/types'

export const sortQuestions = [
  {
    icon: <ListIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.multipleChoice',
    value: QuestionTypesEnum.MultipleChoice
  },
  {
    icon: <ShortTextIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.openAnswer',
    value: QuestionTypesEnum.OpenAnswer
  },
  {
    icon: <RuleIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.oneAnswer',
    value: QuestionTypesEnum.OneAnswer
  }
]

export const determineQuestionType = (type: QuestionTypesEnum) => {
  const isMultipleChoice = type === sortQuestions[0].value
  const isOpenAnswer = type === sortQuestions[1].value
  const isSingleChoice = type === sortQuestions[2].value
  return { isMultipleChoice, isOpenAnswer, isSingleChoice }
}

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotesIcon from '@mui/icons-material/Notes'
import RuleIcon from '@mui/icons-material/Rule'

import { SizeEnum, QuestionTypesEnum } from '~/types'

export const sortQuestions = [
  {
    icon: <CheckCircleOutlineIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.multipleChoice',
    value: QuestionTypesEnum.MultipleChoice
  },
  {
    icon: <NotesIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.openAnswer',
    value: QuestionTypesEnum.OpenAnswer
  },
  {
    icon: <RuleIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.oneAnswer',
    value: QuestionTypesEnum.OneAnswer
  }
]

export const questionType = (type: QuestionTypesEnum) => {
  const isMultipleChoice = type === sortQuestions[0].value
  const isOpenAnswer = type === sortQuestions[1].value
  const isSingleChoice = type === sortQuestions[2].value
  return { isMultipleChoice, isOpenAnswer, isSingleChoice }
}

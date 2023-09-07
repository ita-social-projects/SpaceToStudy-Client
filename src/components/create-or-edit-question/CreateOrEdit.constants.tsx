import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NotesIcon from '@mui/icons-material/Notes'
import RuleIcon from '@mui/icons-material/Rule'
import { SizeEnum } from '~/types'

export const sortQuestions = [
  {
    icon: <CheckCircleOutlineIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.multipleChoice',
    value: 'multipleChoice'
  },
  {
    icon: <NotesIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.openAnswer',
    value: 'openAnswer'
  },
  {
    icon: <RuleIcon fontSize={SizeEnum.Small} />,
    title: 'questionPage.questionType.oneAnswer',
    value: 'oneAnswer'
  }
]

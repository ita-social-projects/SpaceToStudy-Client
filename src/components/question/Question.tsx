import { useTranslation } from 'react-i18next'
import { MenuItem, SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CheckIcon from '@mui/icons-material/Check'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'

import useMenu from '~/hooks/use-menu'
import IconTitleDescription from '~/components/icon-title-description/IconTitleDescription'
import AppChip from '~/components/app-chip/AppChip'
import DragHandle from '~/components/drag-handle/DragHandle'
import { IconButton } from '~/design-system/components/icon-button/IconButton'
import RadioButton from '~/design-system/components/radio-button/RadioButton'

import {
  ColorEnum,
  Question as QuestionInterface,
  QuestionTypesEnum,
  TableActionFunc
} from '~/types'
import { styles } from '~/components/question/Question.styles'
import { spliceSx } from '~/utils/helper-functions'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'

interface QuestionProps {
  question: QuestionInterface
  setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>
  setEditableItemId: React.Dispatch<React.SetStateAction<string>>
  type?: QuestionTypesEnum
  sx?: SxProps
}

const Question: React.FC<QuestionProps> = ({
  question,
  setQuestions,
  setEditableItemId,
  type = QuestionTypesEnum.MultipleChoice,
  sx = {}
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()
  const { isMultipleChoice, isSingleChoice, isOpenAnswer } =
    determineQuestionType(type)
  const onAction = async (actionFunc: TableActionFunc) => {
    closeMenu()
    await actionFunc(question._id)
  }

  const onDeleteQuestion = () => {
    setQuestions((prev) => {
      return prev.filter((item) => item._id !== question._id)
    })
  }

  const rowActions = [
    {
      id: 1,
      label: (
        <Box sx={styles.editIconWrapper}>
          <EditIcon sx={styles.editIcon} />
          {` ${t('common.edit')}`}
        </Box>
      ),
      func: () => setEditableItemId(question._id)
    },
    {
      id: 2,
      label: (
        <Box sx={styles.deleteIconWrapper}>
          <DeleteOutlineIcon color='primary' sx={styles.deleteIcon} />
          {` ${t('common.delete')}`}
        </Box>
      ),
      func: onDeleteQuestion
    }
  ]

  const menuItems = rowActions.map(({ label, func, id }) => (
    <MenuItem key={id} onClick={() => void onAction(func)}>
      {label}
    </MenuItem>
  ))

  const answersList = question.answers.map((answer) => (
    <Box
      key={answer.text}
      sx={[styles.answer, isSingleChoice && styles.singleAnswer]}
    >
      <FormControlLabel
        checked={answer.isCorrect}
        control={isMultipleChoice ? <Checkbox /> : <RadioButton label='' />}
        label={answer.text}
      />
      {answer.isCorrect && <CheckIcon sx={styles.checkIcon} />}
    </Box>
  ))
  const openAnswersList = question.answers.map((answer) => (
    <Box key={answer.text} sx={spliceSx(styles.answer, styles.openAnswer)}>
      <Typography>{answer.text}</Typography>
      {answer.isCorrect && <CheckIcon sx={styles.checkIcon} />}
    </Box>
  ))

  return (
    <Box sx={spliceSx(styles.root, sx)}>
      <DragHandle
        iconStyles={styles.dragIcon}
        wrapperStyles={styles.dragIconWrapper}
      />
      <Box sx={styles.header}>
        <IconTitleDescription
          icon={
            <Box sx={styles.iconWrapper}>
              <LibraryAddCheckOutlinedIcon />
            </Box>
          }
          sx={styles.iconTitleDescription}
          title={question.title}
        />
        <IconButton onClick={openMenu}>
          <MoreVertIcon color={ColorEnum.Primary} sx={styles.moreIcon} />
        </IconButton>
        {renderMenu(menuItems)}
      </Box>

      {question.category && (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {question.category.name}
        </AppChip>
      )}

      <Divider sx={styles.divider} />
      <Box sx={styles.questionBody}>
        <Typography sx={styles.questionText}>{question.text}</Typography>
        <Box
          sx={spliceSx(
            styles.answers,
            isSingleChoice ? styles.singleAnswers : undefined
          )}
        >
          {!isOpenAnswer && answersList}
          {isOpenAnswer && openAnswersList}
        </Box>
      </Box>
    </Box>
  )
}

export default Question

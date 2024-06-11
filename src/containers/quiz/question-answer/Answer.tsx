import { ChangeEventHandler, FC } from 'react'
import { useTranslation } from 'react-i18next'

import FormControlLabel, {
  FormControlLabelProps
} from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import InputAdornment from '@mui/material/InputAdornment'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { SxProps } from '@mui/material/styles'

import AppTextField from '~/components/app-text-field/AppTextField'

import { spliceSx } from '~/utils/helper-functions'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { styles } from '~/containers/quiz/question-answer/Answer.styles'

import { QuestionTypesEnum } from '~/types/my-resources/myResources.index'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'

interface AnswerProps {
  text: string
  isCorrect?: boolean
  value?: string
  label?: string
  checked?: boolean
  shouldShowCorrectness?: boolean
  type: QuestionTypesEnum
  isEditable?: boolean
  sx?: SxProps
  onTextInputChange?: ChangeEventHandler<HTMLInputElement>
  onCheckboxChange?: (isChecked: boolean) => void
}

const Answer: FC<AnswerProps> = ({
  text,
  isCorrect,
  checked,
  type,
  label,
  sx,
  onTextInputChange,
  onCheckboxChange,
  value,
  shouldShowCorrectness = false,
  isEditable = true
}) => {
  const { isMultipleChoice, isOpenAnswer } = determineQuestionType(type)

  const { t } = useTranslation()

  const shouldShowAnswerStatus =
    (isOpenAnswer || checked) && shouldShowCorrectness
  const answerCorrectnessStatus = isCorrect
    ? AnswerStatusEnum.Correct
    : AnswerStatusEnum.Incorrect

  const answerStatus = shouldShowAnswerStatus
    ? answerCorrectnessStatus
    : AnswerStatusEnum.Unanswered

  const handleCheckboxChange: FormControlLabelProps['onChange'] = (
    _,
    checked
  ) => {
    onCheckboxChange && onCheckboxChange(checked)
  }

  const iconStyles = styles.icon(answerStatus)

  const stateIcon = isCorrect ? (
    <CheckIcon sx={iconStyles} />
  ) : (
    <CloseIcon sx={iconStyles} />
  )

  const resultIcon = shouldShowAnswerStatus ? stateIcon : null

  const rootStyle = styles.root(answerStatus, isOpenAnswer)

  if (isOpenAnswer) {
    const inputIcon = resultIcon && (
      <InputAdornment position='end'>{resultIcon}</InputAdornment>
    )

    return (
      <AppTextField
        InputProps={{
          endAdornment: inputIcon,
          disabled: !isEditable
        }}
        fullWidth
        label={t('questionPage.answer')}
        onChange={onTextInputChange}
        sx={spliceSx(rootStyle, sx)}
        value={value}
        withHelperText={false}
      />
    )
  }

  const controlIcon = isMultipleChoice ? (
    <Checkbox disabled={!isEditable} />
  ) : (
    <Radio disabled={!isEditable} />
  )

  return (
    <Box sx={spliceSx(rootStyle, sx)}>
      <FormControlLabel
        checked={checked}
        control={controlIcon}
        label={label}
        onChange={handleCheckboxChange}
        sx={styles.label}
        value={text}
      />
      {resultIcon}
    </Box>
  )
}

export default Answer

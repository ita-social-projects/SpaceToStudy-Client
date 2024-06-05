import {
  FormControlLabel,
  FormControlLabelProps,
  Box,
  Checkbox,
  Radio,
  InputAdornment,
  SxProps
} from '@mui/material'
import { ChangeEventHandler, FC } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from './Answer.styles'
import { QuestionTypesEnum } from '~/types'
import AppTextField from '~/components/app-text-field/AppTextField'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import { useTranslation } from 'react-i18next'

interface Answer {
  text: string
  isCorrect?: boolean
  value?: string
  label?: string
  checked?: boolean
  showCorrectness?: boolean
  type: QuestionTypesEnum
  isEditable?: boolean
  sx?: SxProps
  onTextInputChange?: ChangeEventHandler<HTMLInputElement>
  onCheckboxChange?: (isChecked: boolean) => void
}

const Answer: FC<Answer> = ({
  text,
  isCorrect,
  checked,
  type,
  label,
  sx,
  onTextInputChange,
  onCheckboxChange,
  value = '',
  showCorrectness = false,
  isEditable = true
}) => {
  const { isMultipleChoice, isOpenAnswer } = questionType(type)

  const { t } = useTranslation()

  const shouldShowState = (isOpenAnswer || checked) && showCorrectness
  const baseState = isCorrect ? 'correct' : 'incorrect'
  const answerState = shouldShowState ? baseState : undefined

  const style = styles({ state: answerState, isOpenAnswer })

  const handleCheckboxChange: FormControlLabelProps['onChange'] = (
    _,
    checked
  ) => {
    onCheckboxChange && onCheckboxChange(checked)
  }

  const stateIcon = isCorrect ? (
    <CheckIcon sx={style.icon} />
  ) : (
    <CloseIcon sx={style.icon} />
  )

  const resultIcon = shouldShowState && showCorrectness ? stateIcon : null

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
        sx={style.root}
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
    <Box sx={spliceSx(style.root, sx)}>
      <FormControlLabel
        checked={checked}
        control={controlIcon}
        label={label}
        onChange={handleCheckboxChange}
        sx={style.label}
        value={text}
      />
      {resultIcon}
    </Box>
  )
}

export default Answer

import { ChangeEvent, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import RadioButton from '~/design-system/components/radio-button/RadioButton'
import RadioGroup from '@mui/material/RadioGroup'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import useMenu from '~/hooks/use-menu'
import AppTextField from '~/components/app-text-field/AppTextField'
import Button from '~scss-components/button/Button'
import AppSelect from '~/components/app-select/AppSelect'
import {
  determineQuestionType,
  sortQuestions,
  validateOpenAnswer
} from '~/components/question-editor/QuestionEditor.constants'

import { styles } from '~/components/question-editor/QuestionEditor.styles'
import {
  QuestionForm,
  SizeEnum,
  TextFieldVariantEnum,
  QuestionFormAnswer,
  UseFormErrors
} from '~/types'
import { Typography } from '@mui/material'
import { spliceSx } from '~/utils/helper-functions'

interface QuestionEditorProps {
  data: QuestionForm
  handleInputChange: (
    key: keyof QuestionForm
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleNonInputValueChange: (
    key: keyof QuestionForm,
    value: string | QuestionFormAnswer[]
  ) => void
  onCancel?: () => void
  onEdit?: () => void
  onSave?: () => void
  loading?: boolean
  isQuizQuestion?: boolean
  handleErrors: (key: keyof QuestionForm, error: string) => void
  errors: UseFormErrors<QuestionForm>
}
const QuestionEditor: FC<QuestionEditorProps> = ({
  data,
  handleInputChange,
  handleNonInputValueChange,
  onCancel,
  onEdit,
  onSave,
  loading,
  isQuizQuestion,
  handleErrors,
  errors
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const { type, text, answers } = data
  const { isMultipleChoice, isOpenAnswer, isSingleChoice } =
    determineQuestionType(type)

  const isEmptyAnswer = answers[answers.length - 1]?.text === ''
  const option = sortQuestions.find((item) => item.value === data.type)

  const answersWithId = answers.map((item, index) => ({
    ...item,
    id: index
  }))

  const setTypeValue = (value: string) => {
    handleNonInputValueChange('type', value)
  }

  const sortOptions = sortQuestions.map(({ icon, title, value }) => ({
    title: t(title),
    value,
    icon
  }))

  const handleOptionChange = (index: number, checked: boolean) => {
    const updatedAnswers = [...answers]

    if (isMultipleChoice) {
      updatedAnswers[index].isCorrect = checked
    } else if (isSingleChoice) {
      updatedAnswers.forEach((answer, i) => {
        answer.isCorrect = i === index
      })
    }

    handleNonInputValueChange('answers', updatedAnswers)
  }

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const currentValue = event.target.value

    const updatedAnswers = [...answers]
    updatedAnswers[index] = {
      ...updatedAnswers[index],
      text: currentValue
    }

    handleNonInputValueChange('answers', updatedAnswers)
  }

  const addNewOneAnswer = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (isEmptyAnswer) {
      return
    }

    handleNonInputValueChange('answers', [
      ...data.answers,
      {
        id: data.answers.length,
        text: '',
        isCorrect: isOpenAnswer,
        isEditing: isOpenAnswer
      }
    ])
  }

  const deleteRadioButton = (id: number) => {
    const updatedAnswers = answersWithId.filter((item) => item.id !== id)
    handleNonInputValueChange('answers', updatedAnswers)
  }

  const handleTypeChange = (value: string) => {
    const newAnswers = answers.map((answer) => ({
      ...answer,
      isCorrect: false
    }))
    handleNonInputValueChange('answers', newAnswers)
    setTypeValue(value)
  }

  const onAction = () => {
    closeMenu()
    onEdit?.()
  }

  const options = answersWithId.map((item) => (
    <Box key={item.id} sx={styles.answer}>
      <FormControlLabel
        checked={item.isCorrect}
        control={isMultipleChoice ? <Checkbox /> : <RadioButton label='' />}
        label={
          <InputBase
            fullWidth
            onChange={(e) => onChangeInput(e, item.id)}
            placeholder={t('questionPage.writeYourAnswer')}
            value={item.text}
          />
        }
        onChange={(_, checked) => handleOptionChange(item.id, checked)}
        sx={styles.inputItem}
        value={item.id}
      />
      <IconButton onClick={() => deleteRadioButton(item.id)}>
        <CloseIcon fontSize={SizeEnum.Small} />
      </IconButton>
    </Box>
  ))

  const openAnswerOptions = answersWithId.map((item) => (
    <Box key={item.id} sx={spliceSx(styles.answer, styles.openAnswer)}>
      {item.isEditing ? (
        <AppTextField
          errorMsg={t(errors.answers)}
          fullWidth
          label={t('questionPage.answer')}
          onBlur={() => handleBlur(item.id)}
          onChange={(e) => onChangeInput(e, item.id)}
          value={item.text}
          variant={TextFieldVariantEnum.Outlined}
        />
      ) : (
        <InputBase
          fullWidth
          onChange={(e) => onChangeInput(e, item.id)}
          placeholder={t('questionPage.writeYourAnswer')}
          value={item.text}
        />
      )}
      <IconButton onClick={() => deleteRadioButton(item.id)}>
        <CloseIcon fontSize={SizeEnum.Small} />
      </IconButton>
    </Box>
  ))
  const showMoreMenu = renderMenu(
    <MenuItem onClick={onAction}>
      <Box sx={styles.editIconWrapper}>
        <EditIcon sx={styles.editIcon} />
        {t('myResourcesPage.questions.titleWithCategory')}
      </Box>
    </MenuItem>
  )

  const handleBlur = (index: number) => {
    const updatedAnswers = [...answers]
    if (updatedAnswers[index].text.trim() === '') {
      handleErrors('answers', validateOpenAnswer(updatedAnswers[index].text))
    } else {
      updatedAnswers[index].isEditing = false
      handleNonInputValueChange('answers', updatedAnswers)
    }
  }
  const isButtonVisible = Boolean(text)

  return (
    <Box sx={styles.editorBlock}>
      <Box sx={styles.header}>
        <Box sx={styles.options}>
          {option && <Box sx={styles.iconWrapper}>{option.icon}</Box>}
          <AppSelect
            fields={sortOptions}
            setValue={handleTypeChange}
            sx={styles.selectContainer}
            value={type}
          />
        </Box>
        {isQuizQuestion && (
          <>
            <IconButton onClick={openMenu}>
              <MoreVertIcon color='primary' sx={styles.moreIcon} />
            </IconButton>
            {showMoreMenu}
          </>
        )}
      </Box>

      <Divider sx={styles.editorDivider} />

      <AppTextField
        fullWidth
        label={t('questionPage.question')}
        onChange={handleInputChange('text')}
        value={text}
        variant={TextFieldVariantEnum.Outlined}
      />

      {isMultipleChoice && <FormGroup sx={styles.group}>{options}</FormGroup>}

      {isSingleChoice && <RadioGroup sx={styles.group}>{options}</RadioGroup>}

      {isOpenAnswer && openAnswerOptions}

      <Box
        data-testid='addNewAnswerBtn'
        onClick={addNewOneAnswer}
        sx={
          isOpenAnswer
            ? spliceSx(styles.addRadio(isEmptyAnswer), styles.openAnswer)
            : styles.addRadio(isEmptyAnswer)
        }
      >
        {isOpenAnswer ? (
          <Typography color={isEmptyAnswer ? 'primary.300' : undefined}>
            {t('questionPage.addNewOne')}
          </Typography>
        ) : (
          <FormControlLabel
            checked={false}
            control={isMultipleChoice ? <Checkbox /> : <RadioButton label='' />}
            disabled={isEmptyAnswer}
            label={t('questionPage.addNewOne')}
            value={0}
          />
        )}
        <AddIcon fontSize={SizeEnum.Small} sx={styles.addIcon(isEmptyAnswer)} />
      </Box>
      {onCancel && onSave && (
        <>
          <Divider sx={styles.buttonsDivider} />
          <Box sx={styles.buttons}>
            <Button onClick={onCancel} size='md' variant='tonal'>
              {t('common.cancel')}
            </Button>
            <Button
              disabled={!isButtonVisible}
              loading={loading}
              onClick={() => void onSave()}
              size='md'
              sx={styles.saveButton}
            >
              {t('common.save')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default QuestionEditor

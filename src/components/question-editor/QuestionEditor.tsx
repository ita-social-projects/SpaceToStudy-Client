import { ChangeEvent, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import useMenu from '~/hooks/use-menu'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import AppSelect from '~/components/app-select/AppSelect'
import {
  questionType,
  sortQuestions
} from '~/components/question-editor/QuestionEditor.constants'

import { styles } from '~/components/question-editor/QuestionEditor.styles'
import {
  QuestionForm,
  SizeEnum,
  TextFieldVariantEnum,
  QuestionFormAnswer,
  ButtonVariantEnum
} from '~/types'

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
  onSave?: () => Promise<void>
  loading?: boolean
  isQuizQuestion?: boolean
}

const QuestionEditor: FC<QuestionEditorProps> = ({
  data,
  handleInputChange,
  handleNonInputValueChange,
  onCancel,
  onEdit,
  onSave,
  loading,
  isQuizQuestion
}) => {
  const { t } = useTranslation()
  const { openMenu, renderMenu, closeMenu } = useMenu()

  const { type, text, answers, openAnswer } = data
  const { isMultipleChoice, isOpenAnswer, isSingleChoice } = questionType(type)

  const isEmptyAnswer = answers[answers.length - 1]?.text === ''
  const option = sortQuestions.find((item) => item.value === data.type)

  const answersWithId = answers.map((item, index) => ({
    ...item,
    id: index
  }))

  const setTypeValue = (value: string) => {
    handleNonInputValueChange('type', value ?? sortQuestions[0].value)
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
    if (!isEmptyAnswer) {
      const addAnswer = [
        ...data.answers,
        {
          id: data.answers.length,
          text: '',
          isCorrect: false
        }
      ]
      handleNonInputValueChange('answers', addAnswer)
    }
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
        control={isMultipleChoice ? <Checkbox /> : <Radio />}
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

  const showMoreMenu = renderMenu(
    <MenuItem onClick={onAction}>
      <Box sx={styles.editIconWrapper}>
        <EditIcon sx={styles.editIcon} />
        {t('myResourcesPage.questions.titleWithCategory')}
      </Box>
    </MenuItem>
  )

  const isButtonVisible = text && (isOpenAnswer ? openAnswer : answers[0]?.text)

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

      {!isOpenAnswer && (
        <Box onClick={addNewOneAnswer} sx={styles.addRadio(isEmptyAnswer)}>
          <FormControlLabel
            checked={false}
            control={isMultipleChoice ? <Checkbox /> : <Radio />}
            disabled={isEmptyAnswer}
            label={t('questionPage.addNewOne')}
            value={0}
          />
          <AddIcon
            fontSize={SizeEnum.Small}
            sx={styles.addIcon(isEmptyAnswer)}
          />
        </Box>
      )}

      {isOpenAnswer && (
        <AppTextField
          fullWidth
          label={t('questionPage.answer')}
          onChange={handleInputChange('openAnswer')}
          value={openAnswer}
          variant={TextFieldVariantEnum.Outlined}
        />
      )}

      {onCancel && onSave && (
        <>
          <Divider sx={styles.buttonsDivider} />
          <Box sx={styles.buttons}>
            <AppButton
              onClick={onCancel}
              size={SizeEnum.Medium}
              variant={ButtonVariantEnum.Tonal}
            >
              {t('common.cancel')}
            </AppButton>
            <AppButton
              disabled={!isButtonVisible}
              loading={loading}
              onClick={() => void onSave()}
              size={SizeEnum.Medium}
              sx={styles.saveButton}
            >
              {t('common.save')}
            </AppButton>
          </Box>
        </>
      )}
    </Box>
  )
}

export default QuestionEditor

import { ChangeEvent, MouseEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputBase from '@mui/material/InputBase'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppSelect from '~/components/app-select/AppSelect'
import useForm from '~/hooks/use-form'
import AppButton from '~/components/app-button/AppButton'
import { sortQuestions } from '~/components/question-editor/QuestionEditor.constants'

import { TypographyVariantEnum } from '~/types'
import { styles } from '~/components/question-editor/QuestionEditor.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  QuestionForm,
  SizeEnum,
  TextFieldVariantEnum
} from '~/types'

interface QuestionEditorProps {
  loading: boolean
  fetchData: (data?: QuestionForm) => Promise<void>
}

const QuestionEditor: FC<QuestionEditorProps> = ({ fetchData, loading }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<QuestionForm>({
      initialValues: {
        type: sortQuestions[0].value,
        title: '',
        text: '',
        answers: [],
        openAnswer: ''
      },
      onSubmit: async () => {
        await fetchData(data)
      }
    })

  const { type, title, text, answers, openAnswer } = data

  const isMultipleChoice = type === sortQuestions[0].value
  const isOpenAnswer = type === sortQuestions[1].value
  const isSingleChoice = type === sortQuestions[2].value
  const isEmptyAnswer = answers[answers.length - 1]?.text === ''
  const option = sortQuestions.find((item) => item.value === data.type)

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
    const updatedAnswers = answers.filter((item) => item.id !== id)
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

  const options = answers.map((item) => (
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

  const disabledButton =
    type === 'openAnswer'
      ? !!text && !!openAnswer
      : !!text && !!answers[0]?.text

  const buttons = (
    <Box sx={styles.buttons}>
      <AppButton onClick={() => navigate(-1)} variant={ButtonVariantEnum.Tonal}>
        {t('common.cancel')}
      </AppButton>
      <AppButton
        disabled={!disabledButton}
        loading={loading}
        type={ButtonTypeEnum.Submit}
      >
        {t('common.save')}
      </AppButton>
    </Box>
  )

  const optionsMock = ['English', 'Music']

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.root}
    >
      <AppTextField
        InputLabelProps={styles.titleLabel}
        InputProps={styles.titleInput}
        fullWidth
        inputProps={styles.input}
        label={title ? '' : t('questionPage.untitled')}
        onChange={handleInputChange('title')}
        value={title}
        variant={TextFieldVariantEnum.Standard}
      />

      <Box sx={styles.labelCategory}>
        <Typography variant={TypographyVariantEnum.Body2}>
          {t('questionPage.chooseCategory')}
        </Typography>
        <Autocomplete
          disablePortal
          options={optionsMock}
          renderInput={(params) => <TextField {...params} label='Category' />}
        />
      </Box>

      <Divider sx={styles.mainDivider} />
      <Box sx={styles.editorBlock}>
        <Box sx={styles.options}>
          <Box sx={styles.iconWrapper}>{option!.icon}</Box>
          <AppSelect
            fields={sortOptions}
            setValue={handleTypeChange}
            sx={styles.selectContainer}
            value={type}
          />
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
      </Box>

      {buttons}
    </Box>
  )
}

export default QuestionEditor

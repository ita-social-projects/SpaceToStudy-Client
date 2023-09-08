import { ChangeEvent, MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import InputBase from '@mui/material/InputBase'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppSelect from '~/components/app-select/AppSelect'

import { styles } from '~/components/create-or-edit-question/CreateOrEditQuestion.styles'
import { sortQuestions } from '~/components/create-or-edit-question/CreateOrEdit.constants'
import { Answer, SizeEnum, TextFieldVariantEnum } from '~/types'

const CreateOrEditQuestion = () => {
  const [questionType, setQuestionType] = useState(sortQuestions[0])
  const [question, setQuestion] = useState<string>('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [answer, setAnswer] = useState<string>('')

  const { t } = useTranslation()

  const isMultipleChoice = questionType.value === sortQuestions[0].value
  const isOpenAnswer = questionType.value === sortQuestions[1].value
  const isSingleChoice = questionType.value === sortQuestions[2].value
  const isEmptyAnswer = answers[answers.length - 1]?.text === ''

  const setTypeValue = (value: string) => {
    const questionOption = sortQuestions.find((item) => item.value === value)

    setQuestionType(questionOption ?? sortQuestions[0])
  }

  const handleQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
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

    setAnswers(updatedAnswers)
  }

  const onChangeInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const currentValue = event.target.value
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers]
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        text: currentValue
      }
      return updatedAnswers
    })
  }

  const addNewOneAnswer = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!isEmptyAnswer) {
      setAnswers((prev) => [
        ...prev,
        {
          id: answers.length,
          text: '',
          isCorrect: false
        }
      ])
    }
  }

  const deleteRadioButton = (id: number) => {
    const updatedAnswers = answers.filter((item) => item.id !== id)
    setAnswers(updatedAnswers)
  }

  const handleTypeChange = (value: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) => ({ ...answer, isCorrect: false }))
    )
    setTypeValue(value)
  }

  const handleAnswer = (event: ChangeEvent<HTMLInputElement>) =>
    setAnswer(event.target.value)

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

  return (
    <Box sx={styles.root}>
      <Box sx={styles.questionHeader}>
        <Box sx={styles.options}>
          <Box sx={styles.iconWrapper}>{questionType.icon}</Box>
          <AppSelect
            fields={sortOptions}
            setValue={handleTypeChange}
            sx={styles.selectContainer}
            value={questionType.value}
          />
        </Box>

        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Divider sx={styles.divider} />

      <AppTextField
        fullWidth
        label={t('questionPage.question')}
        onChange={handleQuestion}
        value={question}
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
          onChange={handleAnswer}
          value={answer}
          variant={TextFieldVariantEnum.Outlined}
        />
      )}
    </Box>
  )
}

export default CreateOrEditQuestion

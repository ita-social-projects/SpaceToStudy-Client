import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppCard from '~/components/app-card/AppCard'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AnswerBlock from '~/containers/quiz/quiz-question/AnswerBlock'
import AnswerBlockForTutors from '~/containers/quiz/quiz-question/AnswerBlockForTutors'
import CorrectAnswers from '../question-answer/CorrectAnswer'
import { SxProps } from '@mui/material/styles'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { isCorrectAnswer } from '~/utils/is-correct-answer'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { type Question, UserRoleEnum } from '~/types'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'
import { useAppSelector } from '~/hooks/use-redux'
import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'

interface QuizQuestionProps {
  question: Question
  index: number
  value: string | null | string[]
  shouldShowCorrectAnswers?: boolean
  shouldShowPoints?: boolean
  shouldShowAnswersCorrectness?: boolean
  isEditable?: boolean
  shouldUseAppCardWrapper?: boolean
  sx?: SxProps
  handleInputChange: ChangeEventHandler
  handleNonInputValueChange: (value: string | string[]) => void
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  shouldUseAppCardWrapper,
  sx,
  index,
  shouldShowPoints,
  shouldShowCorrectAnswers,
  shouldShowAnswersCorrectness,
  value,
  question,
  isEditable,
  handleInputChange,
  handleNonInputValueChange
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { attemptId = '' } = useParams()
  const initialIsCorrect = isCorrectAnswer(question, value)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(
    undefined
  )

  const getFinishedQuiz = () => {
    return ResourceService.getFinishedQuiz(attemptId)
  }

  const ContainerComponent = shouldUseAppCardWrapper ? AppCard : Box

  const { data: finishedQuiz, isLoading: isFinishedQuizLoading } = useQuery({
    queryKey: ['finished-quiz', attemptId],
    queryFn: getFinishedQuiz
  })

  const { isOpenAnswer } = determineQuestionType(question.type)

  let correctnessIcon
  useEffect(() => {
    const shouldCheckAnswer =
      isOpenAnswer && finishedQuiz && !isFinishedQuizLoading

    if (shouldCheckAnswer) {
      const currentResult = finishedQuiz.results?.find(
        (res) => res.question === question.text
      )
      const firstAnswer = currentResult?.answers?.[0]

      if (firstAnswer) {
        setIsAnswerCorrect(firstAnswer.isCorrect)
      }
    }

    if (!isOpenAnswer) {
      setIsAnswerCorrect(initialIsCorrect)
    }
  }, [
    finishedQuiz,
    isFinishedQuizLoading,
    isOpenAnswer,
    question.text,
    initialIsCorrect
  ])

  const answersBlock = (
    <AnswerBlock
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputValueChange}
      isAnswerCorrect={isAnswerCorrect}
      isEditable={isEditable}
      question={question}
      shouldShowAnswersCorrectness={shouldShowAnswersCorrectness}
      value={value}
    />
  )

  const answersBlockForTutors = (
    <AnswerBlockForTutors
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputValueChange}
      isAnswerCorrect={isAnswerCorrect}
      isEditable={isEditable}
      onGradeChange={setIsAnswerCorrect}
      question={question}
      shouldShowAnswersCorrectness={shouldShowAnswersCorrectness}
      value={value}
    />
  )

  if (shouldShowAnswersCorrectness && isAnswerCorrect !== undefined) {
    if (isAnswerCorrect) {
      correctnessIcon = <CheckIcon sx={styles.icon(AnswerStatusEnum.Correct)} />
    } else {
      correctnessIcon = (
        <CloseIcon sx={styles.icon(AnswerStatusEnum.Incorrect)} />
      )
    }
  }

  const pointsBlock =
    shouldShowPoints && isAnswerCorrect !== undefined ? (
      <Typography sx={styles.type}>
        {isAnswerCorrect ? '1/1' : '0/1'}
      </Typography>
    ) : null

  return (
    <ContainerComponent sx={spliceSx(styles.root, sx)}>
      <Box sx={styles.typeContainer}>
        <Typography sx={styles.type}>
          {t(`questionPage.questionType.${question.type}`)}
        </Typography>
        {pointsBlock}
      </Box>

      <Box sx={styles.titleContainer}>
        {correctnessIcon}
        <Typography sx={styles.title}>{index + 1}.</Typography>
        <Typography sx={styles.title}>{question.text}</Typography>
      </Box>

      {userRole === UserRoleEnum.Student ? answersBlock : answersBlockForTutors}

      {shouldShowCorrectAnswers && (
        <CorrectAnswers
          isOpenAnswer={isOpenAnswer}
          question={question}
          userRole={userRole as UserRoleEnum}
        />
      )}
    </ContainerComponent>
  )
}

export default QuizQuestion

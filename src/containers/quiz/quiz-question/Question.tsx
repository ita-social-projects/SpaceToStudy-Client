import { type ChangeEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppCard from '~/components/app-card/AppCard'
import AnswerBlock from '~/containers/quiz/quiz-question/AnswerBlock'
import AnswerBlockForTutors from '~/containers/quiz/quiz-question/AnswerBlockForTutors'
import CorrectAnswers from '../question-answer/CorrectAnswer'
import { SxProps } from '@mui/material/styles'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { type Question, UserRoleEnum } from '~/types'
import {
  CORRECT_ANSWER_POINTS,
  INCORRECT_ANSWER_POINTS
} from '~/containers/quiz/quiz-question/Question.constants'
import { useAppSelector } from '~/hooks/use-redux'
import { useParams } from 'react-router-dom'
import { spliceSx } from '~/utils/helper-functions'
import { useAnswerCorrectness } from '~/hooks/use-answer-correctness'
import AnswerCorrectnessIcon from '../question-answer/AnswerCorrectnessIcon'

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

const QuizQuestion: React.FC<QuizQuestionProps> = ({
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

  const { isOpenAnswer, isAnswerCorrect, setIsAnswerCorrect } =
    useAnswerCorrectness(attemptId, question, value)

  const ContainerComponent = shouldUseAppCardWrapper ? AppCard : Box

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

  const pointsBlock =
    shouldShowPoints && isAnswerCorrect !== undefined ? (
      <Typography sx={styles.type}>
        {isAnswerCorrect ? CORRECT_ANSWER_POINTS : INCORRECT_ANSWER_POINTS}
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
        <AnswerCorrectnessIcon
          isCorrect={isAnswerCorrect}
          shouldShow={Boolean(shouldShowAnswersCorrectness)}
        />
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

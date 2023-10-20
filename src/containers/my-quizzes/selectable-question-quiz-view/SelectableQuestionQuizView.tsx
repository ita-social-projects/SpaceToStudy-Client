import { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { Question } from '~/types'
import { styles } from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestion.styles'
import SelectableQuestion from '~/containers/my-quizzes/selectable-question/SelectableQuestion'

interface SelectableQuestionQuizViewProps {
  questions: Question[]
}

const SelectableQuestionQuizView: FC<SelectableQuestionQuizViewProps> = ({
  questions
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const questionsNumberList = questions.map((item, index) => {
    return (
      <Box
        key={item?._id}
        onClick={() => setSelectedIndex(index)}
        sx={styles.root(index === selectedIndex)}
      >
        <Box sx={styles.statusLine} />
        <Typography sx={styles.text}>{index + 1}</Typography>
      </Box>
    )
  })

  return (
    <Box>
      {!!questions.length && (
        <>
          <Box sx={styles.selectableList}>{questionsNumberList}</Box>
          <SelectableQuestion
            question={questions[selectedIndex]}
            selectedIndex={selectedIndex}
          />
        </>
      )}
    </Box>
  )
}

export default SelectableQuestionQuizView

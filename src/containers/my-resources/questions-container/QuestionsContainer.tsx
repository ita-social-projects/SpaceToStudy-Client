import Box from '@mui/material/Box'
import AddResourceWithInput from '../add-resource-with-input/AddResourceWithInput'
import { useCallback } from 'react'
import { questionService } from '~/services/question-service'

const QuestionsContainer = () => {
  const getQuestions = useCallback(() => questionService)

  return (
    <Box>
      <AddResourceWithInput />
    </Box>
  )
}

export default QuestionsContainer

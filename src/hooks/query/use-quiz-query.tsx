import { useCallback, useEffect } from 'react'

import { ResourceService } from '~/services/resource-service'
import useQuery from '~/hooks/use-query'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { ONE_HOUR } from '~/constants'

const useQuizQuery = (quizId: string) => {
  const getQuiz = useCallback(() => {
    return ResourceService.getQuiz(quizId)
  }, [quizId])

  const {
    data: quiz,
    isLoading,
    error
  } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: getQuiz,
    options: {
      staleTime: ONE_HOUR
    }
  })

  const { handleErrorAlert } = useSnackbarAlert()

  useEffect(() => {
    if (error) {
      handleErrorAlert(error)
    }
  }, [error, handleErrorAlert])

  return { quiz, isLoading }
}

export default useQuizQuery

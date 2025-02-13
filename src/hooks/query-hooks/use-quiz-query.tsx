import { useCallback } from 'react'

import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'

const useQuizQuery = (quizId: string) => {
  const getQuiz = useCallback(() => {
    return ResourceService.getQuizQuery(quizId)
  }, [quizId])

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: getQuiz
  })

  return { quiz, isLoading }
}

export default useQuizQuery

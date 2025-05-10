import { useCallback } from 'react'

import useQuery from '~/hooks/use-query'
import { subjectService } from '~/services/subject-service'
import { SubjectNameInterface } from '~/types'
import useTranslate from './use-translate'

interface UseSubjectsNamesProps {
  category: string | null
}

const useSubjectsNames = ({ category }: UseSubjectsNamesProps) => {
  const translateSubjects = useTranslate<SubjectNameInterface>('subjects')

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const {
    isLoading: loading,
    data: response = [],
    refetch: fetchData,
    error
  } = useQuery({
    queryKey: ['subjects-names', category],
    queryFn: getSubjectsNames,
    options: {
      staleTime: Infinity,
      select: translateSubjects
    }
  })

  return {
    loading,
    response,
    fetchData,
    error
  }
}

export default useSubjectsNames

import { QueryObserverResult } from '@tanstack/react-query'
import { useCallback } from 'react'
import { ResponseError } from '~/exceptions'

import useQuery from '~/hooks/use-query'
import { subjectService } from '~/services/subject-service'
import { type SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps<T> {
  category: string | null
  transform?: (data: SubjectNameInterface[]) => T[]
}

interface UseSubjectsNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<QueryObserverResult<T[]>>
  error: ResponseError | null
}

const useSubjectsNames = <T = SubjectNameInterface,>({
  category,
  transform
}: UseSubjectsNamesProps<T>): UseSubjectsNamesResult<T> => {
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
      select: transform
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

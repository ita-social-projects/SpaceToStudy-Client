import {
  QueryObserverResult,
  QueryObserverBaseResult
} from '@tanstack/react-query'
import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useQuery from '~/hooks/use-query'
import { subjectService } from '~/services/subject-service'
import { SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps<T> {
  category: string | null
  fetchOnMount?: boolean
  transform?: (data: SubjectNameInterface[]) => T[]
}

interface UseSubjectsNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<QueryObserverResult<SubjectNameInterface[]>>
  error: QueryObserverBaseResult['error']
}

const useSubjectsNames = <T = SubjectNameInterface,>({
  category,
  fetchOnMount = true,
  transform
}: UseSubjectsNamesProps<T>): UseSubjectsNamesResult<T> => {
  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const {
    isFetching: loading,
    data,
    refetch: fetchData,
    error
  } = useQuery({
    queryKey: ['subjects-names'],
    queryFn: getSubjectsNames,
    options: {
      initialData: defaultResponses.array,
      enabled: fetchOnMount
    }
  })

  return {
    loading,
    response: transform ? transform(data) : (data as unknown as T[]),
    fetchData,
    error
  }
}

export default useSubjectsNames

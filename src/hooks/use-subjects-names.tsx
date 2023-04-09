import { AxiosError } from 'axios'
import { useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps {
  category: string | null
  fetchOnMount?: boolean
}

interface UseSubjectsNamesResult {
  loading: boolean
  response: SubjectNameInterface[]
  mapArrayByField: (data: SubjectNameInterface[], field: string) => string[]
  fetchData: () => void
  error: AxiosError<ErrorResponse> | null
}
const useSubjectsNames = ({ category, fetchOnMount = true }: UseSubjectsNamesProps): UseSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const { loading, response, mapArrayByField, fetchData, error } = useAxios<SubjectNameInterface[]>({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: []
  })

  return { loading, response, mapArrayByField, fetchData, error }
}

export default useSubjectsNames

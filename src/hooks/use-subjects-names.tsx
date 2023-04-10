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
  response: string[]
  fetchData: () => void
  error: AxiosError<ErrorResponse> | null
}
const useSubjectsNames = ({ category, fetchOnMount = true }: UseSubjectsNamesProps): UseSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const { loading, response, fetchData, error } = useAxios<SubjectNameInterface[], string[]>({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: [],
    transform: 'name'
  })

  return { loading, response, fetchData, error }
}

export default useSubjectsNames

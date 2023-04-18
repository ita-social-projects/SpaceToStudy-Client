import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponse, SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps {
  category: string | null
  fetchOnMount?: boolean
  transform: (data: SubjectNameInterface[]) => string[]
}

interface UseSubjectsNamesResult {
  loading: boolean
  response: string[]
  fetchData: () => void
  error: AxiosError<ErrorResponse> | null
}

const useSubjectsNames = ({
  category,
  fetchOnMount = true,
  transform
}: UseSubjectsNamesProps): UseSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const { loading, response, fetchData, error } = useAxios<SubjectNameInterface[], string[]>({
    service: getSubjectsNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useSubjectsNames

import { AxiosResponse } from 'axios'
import { useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponce, SubjectNameInterface } from '~/types'

interface UseSubjectsNamesProps {
  category: string | null
  fetchOnMount?: boolean
}

interface UseSubjectsNamesResult {
  loading: boolean
  data: SubjectNameInterface[]
  fetchData: Promise<AxiosResponse>
  error: Promise<ErrorResponce>
}
const useSubjectsNames = ({ category, fetchOnMount = true }: UseSubjectsNamesProps): UseSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const { loading, data, fetchData, error } = useAxios({
    service: getSubjectsNames,
    fetchOnMount
  })

  return { loading, data, fetchData, error }
}

export default useSubjectsNames

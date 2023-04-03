import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponce, SubjectInterface } from '~/types'

interface useSubjectsNamesProps {
  category?: string
  fetchOnMount?: boolean
}

interface useSubjectsNamesResult {
  loading: boolean
  responseItems: Pick<SubjectInterface, '_id' | 'name'>[]
  fetchData: Promise<AxiosResponse>
  error: Promise<ErrorResponce>
}

const useSubjectsNames = ({ category, fetchOnMount = true }: useSubjectsNamesProps): useSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const { loading, response, fetchData, error } = useAxios({
    service: getSubjectsNames,
    fetchOnMount
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return { loading, responseItems, fetchData, error }
}

export default useSubjectsNames

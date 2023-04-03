import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponce, SubjectInterface } from '~/types'

interface useSubjectsNamesProps {
  category?: string
}

interface useSubjectsNamesResult {
  loading: boolean
  responseItems: Pick<SubjectInterface, '_id' | 'name'>[]
  fetchData: Promise<AxiosResponse>,
  error: Promise<ErrorResponce>
}

const useSubjectsNames = ({ category }: useSubjectsNamesProps): useSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const {
    loading,
    response,
    fetchData,
    error
  } = useAxios({
    service: getSubjectsNames
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return { loading, responseItems, fetchData, error }
}

export default useSubjectsNames

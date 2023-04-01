import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { SubjectInterface } from '~/types'

interface useSubjectsNamesProps {
  category?: string
}

interface useSubjectsNamesResult {
  loading: boolean
  responseItems: Pick<SubjectInterface, '_id' | 'name'>[]
  fetchData: Promise<AxiosResponse>
}

const useSubjectsNames = ({ category }: useSubjectsNamesProps): useSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const {
    loading,
    response,
    fetchData
  } = useAxios<string[]>({
    service: getSubjectsNames
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return { loading, responseItems, fetchData }
}

export default useSubjectsNames

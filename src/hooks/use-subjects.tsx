import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { SubjectInterface } from '~/types'

interface useSubjectsResult {
  loading: boolean
  responseItems: SubjectInterface[]
  fetchData: Promise<AxiosResponse>
}

const useSubjects = (): useSubjectsResult => {
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])

  const {
    loading,
    response,
    fetchData
  } = useAxios<SubjectInterface[]>({ service: getSubjects })

  const responseItems = useMemo(() => response?.data || [], [response])

  return { loading, responseItems, fetchData }
}

export default useSubjects

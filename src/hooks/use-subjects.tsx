import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { SubjectInterface } from '~/types'

interface useSubjectsResult {
  subjectsLoading: boolean
  subjectsItems: SubjectInterface[]
  fetchSubjects: Promise<AxiosResponse>
}

const useSubjects = (): useSubjectsResult => {
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])

  const {
    loading: subjectsLoading,
    response: subjectsData,
    fetchData: fetchSubjects
  } = useAxios<SubjectInterface[]>({ service: getSubjects })

  const subjectsItems = useMemo(() => subjectsData?.data || [], [subjectsData])

  return { subjectsLoading, subjectsItems, fetchSubjects }
}

export default useSubjects

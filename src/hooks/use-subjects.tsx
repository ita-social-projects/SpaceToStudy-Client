import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'

import { subjectService } from '~/services/subject-service'
import { SubjectInterface } from '~/types'

interface useSubjectsProps {
  category?: string 
  fetchOnMount: {
    subjects: boolean
    subjectsNames: boolean
  }
}

interface UseuseSubjectsResult {
  subjectsLoading: boolean
  subjectsItems: SubjectInterface[]
  fetchSubjects: Promise<AxiosResponse>
  subjectsNamesLoading: boolean
  subjectsNamesItems: Pick<SubjectInterface, '_id' | 'name'>[]
  fetchSubjectsNames: Promise<AxiosResponse>
}

const useSubjects = ({ category, fetchOnMount }: useSubjectsProps): UseuseSubjectsResult => {
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const {
    loading: subjectsLoading,
    response: subjectsData,
    fetchData: fetchSubjects
  } = useAxios<SubjectInterface[]>({ service: getSubjects, fetchOnMount: fetchOnMount.subjects })
  const {
    loading: subjectsNamesLoading,
    response: subjectsNamesData,
    fetchData: fetchSubjectsNames
  } = useAxios<string[]>({
    service: getSubjectsNames,
    fetchOnMount: fetchOnMount.subjectsNames
  })

  const subjectsItems = useMemo(() => subjectsData?.data || [], [subjectsData])
  const subjectsNamesItems = useMemo(() => subjectsNamesData?.data || [], [subjectsNamesData])

  return { subjectsLoading, subjectsItems, fetchSubjects, subjectsNamesLoading, subjectsNamesItems, fetchSubjectsNames }
}

export default useSubjects

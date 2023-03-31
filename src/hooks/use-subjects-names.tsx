import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { SubjectInterface } from '~/types'

interface useSubjectsNamesProps {
  category?: string
}

interface useSubjectsNamesResult {
  subjectsNamesLoading: boolean
  subjectsNamesItems: Pick<SubjectInterface, '_id' | 'name'>[]
  fetchSubjectsNames: Promise<AxiosResponse>
}

const useSubjectsNames = ({ category }: useSubjectsNamesProps): useSubjectsNamesResult => {
  const getSubjectsNames = useCallback(() => subjectService.getSubjectsNames(category), [category])

  const {
    loading: subjectsNamesLoading,
    response: subjectsNamesData,
    fetchData: fetchSubjectsNames
  } = useAxios<string[]>({
    service: getSubjectsNames
  })

  const subjectsNamesItems = useMemo(() => subjectsNamesData?.data || [], [subjectsNamesData])

  return { subjectsNamesLoading, subjectsNamesItems, fetchSubjectsNames }
}

export default useSubjectsNames

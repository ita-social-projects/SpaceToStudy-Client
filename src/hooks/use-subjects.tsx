import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'
import { ErrorResponce, SubjectInterface } from '~/types'

interface useSubjectsProps {
  fetchOnMount?: boolean
}

interface useSubjectsResult {
  loading: boolean
  responseItems: SubjectInterface[]
  fetchData: Promise<AxiosResponse>
  error: Promise<ErrorResponce>
}

const useSubjects = ({ fetchOnMount = true }: useSubjectsProps): useSubjectsResult => {
  const getSubjects = useCallback(() => subjectService.getSubjects(), [])

  const { loading, response, fetchData, error } = useAxios({ service: getSubjects, fetchOnMount })

  const responseItems = useMemo(() => response?.data || [], [response])

  return { loading, responseItems, fetchData, error }
}

export default useSubjects

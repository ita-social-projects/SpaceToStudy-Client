import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface, ErrorResponse } from '~/types'

interface UseCategoriesNameProps {
  fetchOnMount?: boolean
}

interface UseCategoriesNamesResult {
  loading: boolean
  response: CategoryNameInterface[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

const useCategoriesNames = ({
  fetchOnMount = true
}: UseCategoriesNameProps): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategoryNameInterface[]
  >({
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames

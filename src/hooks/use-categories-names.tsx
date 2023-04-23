import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface, ErrorResponse } from '~/types'

interface UseCategoriesNamesResult<T> {
  loading: boolean
  response: T[]
  fetchData: () => Promise<void>
  error: ErrorResponse | null
}

interface UseCategoriesNamesProps<T> {
  fetchOnMount?: boolean
  transform?: (data: CategoryNameInterface[]) => T[]
}

const useCategoriesNames = <T = CategoryNameInterface,>({
  fetchOnMount = true,
  transform
}: UseCategoriesNamesProps<T>): UseCategoriesNamesResult<T> => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const { loading, response, fetchData, error } = useAxios<
    CategoryNameInterface[],
    T[]
  >({
    service: getCategoriesNames,
    fetchOnMount,
    defaultResponse: defaultResponses.array,
    transform
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames

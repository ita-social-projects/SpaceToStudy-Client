import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface } from '~/types'

const useCategoriesNames = ({ fetchOnMount = true } = {}) => {
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

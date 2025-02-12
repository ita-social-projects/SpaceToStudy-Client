import { useCallback } from 'react'
import { defaultResponses } from '~/constants'

import useQuery from '~/hooks/use-query'
import { categoryService } from '~/services/category-service'

const useCategoriesNames = ({ fetchOnMount = true } = {}) => {
  const getCategoriesNames = useCallback(
    () => categoryService.getCategoriesNames(),
    []
  )

  const {
    isLoading: loading,
    data: response,
    refetch: fetchData,
    error
  } = useQuery({
    queryKey: ['categories-names'],
    queryFn: getCategoriesNames,
    options: {
      initialData: defaultResponses.array,
      enabled: fetchOnMount
    }
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames

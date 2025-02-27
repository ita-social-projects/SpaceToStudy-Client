import useQuery from '~/hooks/use-query'
import { categoryService } from '~/services/category-service'

const useCategoriesNames = () => {
  const {
    isLoading: loading,
    data: response = [],
    refetch: fetchData,
    error
  } = useQuery({
    queryKey: ['categories-names'],
    queryFn: categoryService.getCategoriesNames,
    options: {
      staleTime: Infinity
    }
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames

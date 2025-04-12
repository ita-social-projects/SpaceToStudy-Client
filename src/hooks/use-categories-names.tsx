import useQuery from '~/hooks/use-query'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface } from '~/types'
import useTranslate from './use-translate'

const useCategoriesNames = () => {
  const translateCategories = useTranslate<CategoryNameInterface>('categories')

  const {
    isLoading: loading,
    data: response = [],
    refetch: fetchData,
    error
  } = useQuery({
    queryKey: ['categories-names'],
    queryFn: categoryService.getCategoriesNames,
    options: {
      staleTime: Infinity,
      select: translateCategories
    }
  })

  return { loading, response, fetchData, error }
}

export default useCategoriesNames

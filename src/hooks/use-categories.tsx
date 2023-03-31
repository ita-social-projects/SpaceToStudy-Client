import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, Params } from '~/types'

interface useCategoriesProps {
  params: Params
}

interface UseCategoriesResult {
  categoriesLoading: boolean
  categoriesItems: CategoryInterface[]
  fetchCategories: Promise<AxiosResponse>
}

const useCategories = ({ params }: useCategoriesProps): UseCategoriesResult => {
  const getCategories = useCallback(() => categoryService.getCategories(params), [params])

  const {
    loading: categoriesLoading,
    response: catogoriesData,
    fetchData: fetchCategories
  } = useAxios<CategoryInterface[]>({
    service: getCategories
  })

  const categoriesItems = useMemo(() => catogoriesData?.data || [], [catogoriesData])

  return {
    categoriesLoading,
    categoriesItems,
    fetchCategories
  }
}

export default useCategories

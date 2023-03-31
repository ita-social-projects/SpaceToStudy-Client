import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface } from '~/types'

interface UseCategoriesNamesResult {
  categoriesNamesLoading: boolean
  categoriesNamesItems: Pick<CategoryInterface, '_id' | 'name'>[]
  fetchCategoriesNames: Promise<AxiosResponse>
}

const useCategoriesNames = (): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])

  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesData,
    fetchData: fetchCategoriesNames
  } = useAxios<CategoryInterface[]>({
    service: getCategoriesNames
  })

  const categoriesNamesItems = useMemo(() => categoriesNamesData?.data || [], [categoriesNamesData])

  return {
    categoriesNamesLoading,
    categoriesNamesItems,
    fetchCategoriesNames
  }
}

export default useCategoriesNames

import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'

import { categoryService, Options } from '~/services/category-service'
import { CategoryInterface } from '~/types'

interface useCategoriesProps {
  options?: Options
  fetchOnMount: {
    categories: boolean
    categoriesNames: boolean
  }
}

interface UseCategoriesResult {
  categoriesLoading: boolean
  categoriesItems: CategoryInterface[]
  fetchCategories: Promise<AxiosResponse>
  categoriesNamesLoading: boolean
  categoriesNamesItems: Pick<CategoryInterface, '_id' | 'name'>[]
  fetchCategoriesNames: Promise<AxiosResponse>
}

const useCategories = ({ options, fetchOnMount }: useCategoriesProps): UseCategoriesResult => {
  const getCategories = useCallback(() => categoryService.getCategories(options), [options])
  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])

  const {
    loading: categoriesLoading,
    response: catogoriesData,
    fetchData: fetchCategories
  } = useAxios<CategoryInterface[]>({
    service: getCategories,
    fetchOnMount: fetchOnMount.categories
  })
  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesData,
    fetchData: fetchCategoriesNames
  } = useAxios<CategoryInterface[]>({
    service: getCategoriesNames,
    fetchOnMount: fetchOnMount.categoriesNames
  })

  const categoriesItems = useMemo(() => catogoriesData?.data || [], [catogoriesData])
  const categoriesNamesItems = useMemo(() => categoriesNamesData?.data || [], [categoriesNamesData])

  return {
    categoriesLoading,
    categoriesItems,
    fetchCategories,
    categoriesNamesLoading,
    categoriesNamesItems,
    fetchCategoriesNames
  }
}

export default useCategories

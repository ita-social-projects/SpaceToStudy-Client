import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface } from '~/types'

interface UseCategoriesNamesResult {
  loading: boolean
  responseItems: Pick<CategoryInterface, '_id' | 'name'>[]
  fetchData: Promise<AxiosResponse>
}

const useCategoriesNames = (): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])

  const {
    loading,
    response,
    fetchData
  } = useAxios<CategoryInterface[]>({
    service: getCategoriesNames
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return {
    loading,
    responseItems,
    fetchData
  }
}

export default useCategoriesNames

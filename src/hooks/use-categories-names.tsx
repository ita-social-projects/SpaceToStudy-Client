import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, ErrorResponce } from '~/types'

interface UseCategoriesNamesResult {
  loading: boolean
  responseItems: Pick<CategoryInterface, '_id' | 'name'>[]
  fetchData: Promise<AxiosResponse>,
  error: Promise<ErrorResponce>
}

const useCategoriesNames = (): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])

  const {
    loading,
    response,
    fetchData,
    error
  } = useAxios({
    service: getCategoriesNames
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return {
    loading,
    responseItems,
    fetchData,
    error
  }
}

export default useCategoriesNames

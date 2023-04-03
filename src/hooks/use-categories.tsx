import { AxiosResponse } from 'axios'
import { useCallback, useMemo } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, ErrorResponce, Params } from '~/types'

interface useCategoriesProps {
  params: Params
}

interface UseCategoriesResult {
  loading: boolean
  responseItems: CategoryInterface[]
  fetchData: Promise<AxiosResponse>,
  error: Promise<ErrorResponce>
}

const useCategories = ({ params }: useCategoriesProps): UseCategoriesResult => {
  const getCategories = useCallback(() => categoryService.getCategories(params), [params])

  const {
    loading,
    response,
    fetchData,
    error
  } = useAxios({
    service: getCategories
  })

  const responseItems = useMemo(() => response?.data || [], [response])

  return {
    loading,
    responseItems,
    fetchData,
    error
  }
}

export default useCategories

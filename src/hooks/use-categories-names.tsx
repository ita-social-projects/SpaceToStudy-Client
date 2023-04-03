import { AxiosResponse } from 'axios'
import { useCallback } from 'react'

import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryNameInterface, ErrorResponce } from '~/types'

interface useCategoriesNameProps {
  fetchOnMount?: boolean
}

interface UseCategoriesNamesResult {
  loading: boolean
  data: CategoryNameInterface[]
  fetchData: Promise<AxiosResponse>
  error: Promise<ErrorResponce>
}

const useCategoriesNames = ({ fetchOnMount = true }: useCategoriesNameProps): UseCategoriesNamesResult => {
  const getCategoriesNames = useCallback(() => categoryService.getCategoriesNames(), [])

  const { loading, data, fetchData, error } = useAxios({
    service: getCategoriesNames,
    fetchOnMount
  })

  return { loading, data, fetchData, error }
}

export default useCategoriesNames

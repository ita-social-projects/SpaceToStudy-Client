import { useTableContext } from '~/context/table-context'

import { TableContextType } from '~/types/common/interfaces/common.interfaces'

type FilterValue = (string | number)[]

type UseFilterReturnType<U> = {
  filters: U
  setFilterByKey: (filterKey: keyof U) => (filterValue: FilterValue) => void
  clearFilterByKey: (filterKey: keyof U) => void
  clearFilters: () => void
}

const useFilter = <T, U>(): UseFilterReturnType<U> => {
  const { filters, setFilters, initialFilters } = useTableContext() as unknown as TableContextType<T, U>

  const setFilterByKey =
    (filterKey: keyof U) =>
      (filterValue: FilterValue): void => {
        setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
      }

  const clearFilterByKey = (filterKey: keyof U) => {
    setFilters((prev) => ({ ...prev, [filterKey]: initialFilters[filterKey as keyof U] }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, setFilterByKey, clearFilters, clearFilterByKey }
}

export default useFilter

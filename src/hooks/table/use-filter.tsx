import { useTableContext } from '~/context/table-context'
import { TableContextType } from '~/types'

type FilterValue = (string | number)[]

type UseFilterReturnType<Filters> = {
  filters: Filters
  setFilterByKey: (
    filterKey: keyof Filters
  ) => (filterValue: FilterValue) => void
  clearFilterByKey: (filterKey: keyof Filters) => void
  clearFilters: () => void
}

const useFilter = <Entity, Filters>(): UseFilterReturnType<Filters> => {
  const { filters, setFilters, initialFilters } =
    useTableContext() as TableContextType<Entity, Filters>

  const setFilterByKey =
    (filterKey: keyof Filters) =>
    (filterValue: FilterValue): void => {
      setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
    }

  const clearFilterByKey = (filterKey: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: initialFilters[filterKey]
    }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, setFilterByKey, clearFilters, clearFilterByKey }
}

export default useFilter

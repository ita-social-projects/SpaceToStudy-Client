import { useTableContext } from '~/context/table-context'

const useFilter = () => {
  const { filters, setFilters, initialFilters } = useTableContext()

  const setFilterByKey = (filterKey) => (filterValue) => {
    setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
  }

  const clearFilterByKey = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: initialFilters[filterKey] }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  return { filters, setFilterByKey, clearFilters, clearFilterByKey }
}

export default useFilter

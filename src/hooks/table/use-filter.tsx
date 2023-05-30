import { useState } from 'react'

interface FilterHookProps<T> {
  initialFilters: T
}

export interface FilterHook<T> {
  filters: T
  setFilterByKey: <K extends keyof T>(
    filterKey: K
  ) => (filterValue: T[K]) => void
  clearFilterByKey: <K extends keyof T>(filterKey: K) => () => void
  clearFilters: () => void
}

const useFilter = <T extends object>({
  initialFilters
}: FilterHookProps<T>) => {
  const [filters, setFilters] = useState<T>(initialFilters)

  const setFilterByKey =
    <K extends keyof T>(filterKey: K) =>
    (filterValue: T[K]) => {
      setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
    }

  const clearFilterByKey = (filterKey: keyof T) => () => {
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

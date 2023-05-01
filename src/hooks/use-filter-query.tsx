import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FindOffersFiltersActions } from '~/types'
import { parseQueryParams } from '~/utils/helper-functions'

interface UseFilterQueryOptions<T> {
  defaultFilters: T
  countActiveFilters?: (
    searchParams: URLSearchParams,
    defaultFilters: T
  ) => number
}

interface FilterQueryHook<T> {
  filters: T
  filterQueryActions: FindOffersFiltersActions<T>
  activeFilterCount?: number
}

export const useFilterQuery = <T extends object>({
  defaultFilters,
  countActiveFilters
}: UseFilterQueryOptions<T>): FilterQueryHook<T> => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<T>(defaultFilters)

  useEffect(() => {
    const parsedFilters = parseQueryParams(searchParams, defaultFilters)
    parsedFilters
      ? setFilters({ ...defaultFilters, ...parsedFilters })
      : setFilters(defaultFilters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateFilter = useCallback(<K extends keyof T>(value: T[K], key: K) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
  }, [])

  const updateQueryParams = useCallback(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, String(value))
      } else {
        searchParams.delete(key)
      }
    })
    setSearchParams(searchParams.toString())
  }, [filters, searchParams, setSearchParams])

  const resetFilters = useCallback(() => {
    setSearchParams([])
    setFilters(defaultFilters)
  }, [defaultFilters, setSearchParams])

  const activeFilterCount =
    countActiveFilters && countActiveFilters(searchParams, defaultFilters)

  return {
    filters,
    activeFilterCount,
    filterQueryActions: { updateFilter, resetFilters, updateQueryParams }
  }
}

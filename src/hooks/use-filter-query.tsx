import { useState, useCallback } from 'react'
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
  searchParams: URLSearchParams
  activeFilterCount: number | null
}

export const useFilterQuery = <T extends object>({
  defaultFilters,
  countActiveFilters
}: UseFilterQueryOptions<T>): FilterQueryHook<T> => {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsedFilters = parseQueryParams(searchParams, defaultFilters)
  const [filters, setFilters] = useState<T>({
    ...defaultFilters,
    ...parsedFilters
  })

  const updateFilter = useCallback(<K extends keyof T>(value: T[K], key: K) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
  }, [])

  const updateFilterInQuery = useCallback(
    <K extends keyof T>(value: T[K], key: K) => {
      updateFilter(value, key)
      if (value) {
        searchParams.set(String(key), String(value))
      } else {
        searchParams.delete(String(key))
      }
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams, updateFilter]
  )

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

  const activeFilterCount = countActiveFilters
    ? countActiveFilters(searchParams, defaultFilters)
    : null

  return {
    filters,
    activeFilterCount,
    searchParams,
    filterQueryActions: {
      updateFilter,
      resetFilters,
      updateQueryParams,
      updateFilterInQuery
    }
  }
}

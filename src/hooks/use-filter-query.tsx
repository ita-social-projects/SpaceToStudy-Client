import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiltersActions, UpdateFiltersInQuery } from '~/types'
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
  filterQueryActions: FiltersActions<T>
  searchParams: URLSearchParams
  activeFilterCount?: number
}

export const useFilterQuery = <T extends object>({
  defaultFilters,
  countActiveFilters
}: UseFilterQueryOptions<T>): FilterQueryHook<T> => {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsedFilters = parseQueryParams(searchParams, defaultFilters)

  const filters = useMemo(
    () => ({ ...defaultFilters, ...parsedFilters }),
    [defaultFilters, parsedFilters]
  )

  const updateFiltersInQuery: UpdateFiltersInQuery<T> = useCallback(
    (valuesToUpdate) => {
      for (const key in valuesToUpdate) {
        const value = valuesToUpdate[key]

        if (value) {
          searchParams.set(String(key), String(value))
        } else {
          searchParams.delete(String(key))
        }
      }

      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
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
  }, [setSearchParams])

  const activeFilterCount = countActiveFilters?.(searchParams, defaultFilters)

  return {
    filters,
    activeFilterCount,
    searchParams,
    filterQueryActions: {
      resetFilters,
      updateQueryParams,
      updateFiltersInQuery
    }
  }
}

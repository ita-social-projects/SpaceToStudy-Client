import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parseQueryParams } from '~/utils/helper-functions'

export const useFilterQuery = ({ defaultFilters, countActiveFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const parsedFilters = parseQueryParams(searchParams, defaultFilters)
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...parsedFilters
  })

  const updateFilter = useCallback((value, key) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }))
  }, [])

  const updateFilterInQuery = useCallback(
    (value, key) => {
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

  const activeFilterCount =
    countActiveFilters && countActiveFilters(searchParams, defaultFilters)

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

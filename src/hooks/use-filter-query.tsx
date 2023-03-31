import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FindOfferFilterTypes, FindOffersDefaultFilters, FindOffersFilters, FindOffersFiltersActions } from '~/types'
import { parseQueryParams } from '~/utils/helper-functions'
import { isDefaultPrice, isEmptyArray } from '~/utils/range-filter'

interface UseFilterQueryOptions {
  defaultFilters: FindOffersDefaultFilters
};

interface FilterQueryHook {
  filters: FindOffersFilters;
  countActiveFilters: number;
  filterQueryActions: FindOffersFiltersActions
};

export const useFilterQuery = ({ defaultFilters }:UseFilterQueryOptions): FilterQueryHook => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<FindOffersFilters>(defaultFilters)

  useEffect(() => {
    const parsedFilters = parseQueryParams(searchParams)
    parsedFilters ? setFilters({ ...defaultFilters, ...parsedFilters }) : setFilters(defaultFilters)
  }, [searchParams, defaultFilters])

  const updateFilter = useCallback((value: FindOfferFilterTypes, key: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }))
  }, [])

  const updateQueryParams = useCallback(() => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString())
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

  const countActiveFilters = useMemo(() => {
    const filtersFromQuery = parseQueryParams(searchParams) || {}
    return Object.entries(filtersFromQuery).reduce((count, [key, value]) => {
      if (key === 'sort') {
        return count
      }
      if (key === 'price' && isDefaultPrice(value, defaultFilters.price)) {
        return count
      }
      if (isEmptyArray(value)) {
        return count
      }
      return count + (value !== defaultFilters[key as keyof FindOffersDefaultFilters] ? 1 : 0)
    }, 0)
  }, [searchParams, defaultFilters])

  return { filters, countActiveFilters, filterQueryActions: { updateFilter, resetFilters, updateQueryParams } }
}

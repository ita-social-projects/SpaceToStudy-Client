import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { parseQueryParams } from '~/utils/helper-functions'

type DefaultFilters = {
  sort: string,
  language: string,
  native: string
}

type UseFilterQueryOptions = {
  defaultFilters: DefaultFilters
};
type FilterQueryHook<T> = {
  filters: DefaultFilters;
  updateFilter: (value: T, key: string) => void;
  resetFilters: () => void;
  updateQueryParams: () => void;
};


export const useFilterQuery = <T,>({ defaultFilters }: UseFilterQueryOptions): FilterQueryHook<T> => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<DefaultFilters>(defaultFilters)

  useEffect(() => {
    const parsedFilters = parseQueryParams(searchParams)
    parsedFilters ? setFilters(parsedFilters) : setFilters(defaultFilters)
  }, [searchParams, defaultFilters])

  const updateFilter = (value: T, key: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }))
  }

  const updateQueryParams = () => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString())
      } else {
        searchParams.delete(key)
      }
    })
    setSearchParams(searchParams)
  }

  const resetFilters = () => {
    setSearchParams([])
    setFilters(defaultFilters)
  }

  return { filters, updateFilter, resetFilters, updateQueryParams }
}

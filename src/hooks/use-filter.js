import { useState } from 'react'

const useFilter = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters)

  const setFilterByKey = (filterKey) => (filterValue) => {
    setFilters((prev) => ({ ...prev, [filterKey]: filterValue }))
  }

  return { filters, setFilterByKey }
}

export default useFilter

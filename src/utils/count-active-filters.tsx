import { parseQueryParams } from '~/utils/helper-functions'
import { isDefaultPrice, isEmptyArray } from '~/utils/range-filter'
import { FindOffersFilters } from '~/types'

export const countActiveFilters = (
  searchParams: URLSearchParams,
  defaultFilters: FindOffersFilters
) => {
  const filtersFromQuery = parseQueryParams(searchParams, defaultFilters) || {}
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
    return (
      count + (value !== defaultFilters[key as keyof FindOffersFilters] ? 1 : 0)
    )
  }, 0)
}

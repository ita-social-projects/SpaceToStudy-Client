import { parseQueryParams } from '~/utils/helper-functions'
import { isDefaultPrice, isEmptyArray } from '~/utils/range-filter'
import { FindOffersFilters } from '~/types'

export const countActiveOfferFilters = (
  searchParams: URLSearchParams,
  defaultFilters: FindOffersFilters
) => {
  const filtersFromQuery = parseQueryParams(searchParams, defaultFilters) ?? {}
  const ignoredFields = ['sort', 'authorRole', 'categoryId', 'subjectId']
  return Object.entries(filtersFromQuery).reduce((count, [key, value]) => {
    if (ignoredFields.includes(key)) {
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

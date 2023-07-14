import { parseQueryParams } from '~/utils/helper-functions'
import { isDefaultPrice, isEmptyArray } from '~/utils/range-filter'

export const countActiveOfferFilters = (searchParams, defaultFilters) => {
  const filtersFromQuery = parseQueryParams(searchParams, defaultFilters) ?? {}
  const ignoredFields = [
    'sort',
    'authorRole',
    'categoryId',
    'subjectId',
    'page'
  ]
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
    return count + (value !== defaultFilters[key] ? 1 : 0)
  }, 0)
}

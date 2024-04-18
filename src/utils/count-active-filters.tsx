import { parseQueryParams } from '~/utils/helper-functions'
import { isDefaultPrice, isEmptyArray } from '~/utils/range-filter'
import { FindOffersFilters, CourseFilters } from '~/types'

const countActiveFilters = (
  searchParams: URLSearchParams,
  defaultFilters: FindOffersFilters | CourseFilters,
  ignoredFields: string[]
) => {
  const filtersFromQuery = parseQueryParams(searchParams, defaultFilters) ?? {}

  return Object.entries(filtersFromQuery).reduce((count, [key, value]) => {
    if (
      ignoredFields.includes(key) ||
      ('price' in defaultFilters &&
        key === 'price' &&
        isDefaultPrice(value, defaultFilters.price)) ||
      isEmptyArray(value)
    ) {
      return count
    }
    return (
      count +
      (value !==
      defaultFilters[key as keyof (FindOffersFilters | CourseFilters)]
        ? 1
        : 0)
    )
  }, 0)
}

export const countActiveOfferFilters = (
  searchParams: URLSearchParams,
  defaultFilters: FindOffersFilters
) =>
  countActiveFilters(searchParams, defaultFilters, [
    'sort',
    'authorRole',
    'categoryId',
    'subjectId',
    'page'
  ])

export const countActiveCourseFilters = (
  searchParams: URLSearchParams,
  defaultFilters: CourseFilters
) => countActiveFilters(searchParams, defaultFilters, ['sort', 'page'])

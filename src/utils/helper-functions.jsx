import { student, tutor } from '~/constants'

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const parseQueryParams = (searchParams, defaultFilters) => {
  const filtersFromQuery = {}
  searchParams.forEach((value, key) => {
    if (key in defaultFilters) {
      if (key === 'price' || key === 'proficiencyLevel') {
        filtersFromQuery[key] = value ? value.split(',') : []
      } else {
        filtersFromQuery[key] = value
      }
    }
  })

  const result = Object.keys(filtersFromQuery).length ? filtersFromQuery : null

  return result
}

export const getEmptyValues = (initialValues, defaultValue) => {
  return Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: defaultValue }),
    {}
  )
}

export const findFullObjects = (array) =>
  array.filter((el) => Object.values(el).every((el) => el))

export const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getScreenBasedLimit = (breakpoints, limits) => {
  const { isDesktop, isLaptopAndAbove, isLaptop, isTablet, isMobile } =
    breakpoints

  switch (true) {
    case isDesktop:
      return limits.desktop ?? limits.default
    case isLaptopAndAbove:
      return limits.laptopAndDesktop ?? limits.default
    case isLaptop:
      return limits.laptop ?? limits.default
    case isTablet:
      return limits.tablet
    case isMobile:
      return limits.mobile
    default:
      return limits.default
  }
}

export const ajustColumns = (breakpoints, columns, rules) => {
  const { isDesktop, isTablet, isMobile } = breakpoints
  const removeColumns = (rule) =>
    columns.filter(({ label }) => !rule?.includes(label))

  switch (true) {
    case isDesktop:
      return removeColumns(rules.desktop)
    case isTablet:
      return removeColumns(rules.tablet)
    case isMobile:
      return removeColumns(rules.mobile)
    default:
      return columns
  }
}

export const spliceSx = (defaultStyles, newStyles) => ({
  ...defaultStyles,
  ...newStyles
})

export const studentOrTutor = (userRole) =>
  userRole === tutor ? tutor : student

export const getOpositeRole = (role) => (role === tutor ? student : tutor)

const createQueryParamsString = (query) => {
  const queryParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    queryParams.append(key, value)
  })

  return queryParams.toString()
}

export const createUrlPath = (URL, params, query = {}) => {
  const queryParams = createQueryParamsString(query)
  const queryParamsString = queryParams ? `?${queryParams}` : ''
  const paramsString = params ? `/${params}` : ''

  return `${URL}${paramsString}${queryParamsString}`
}

export const ellipsisTextStyle = (linesCount) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const getDifferenceDates = (startDate, endDate) => {
  const difference = new Date(endDate).getTime() - new Date(startDate).getTime()

  const conversionToDays = Math.abs(Math.round(difference / (1000 * 3600 * 24)))

  if (conversionToDays >= 365) {
    const years = Math.floor(conversionToDays / 365)
    return { number: years, format: 'Year' }
  }

  if (conversionToDays >= 31) {
    const months = Math.floor(conversionToDays / 31)
    return { number: months, format: 'Month' }
  }

  if (conversionToDays >= 7) {
    const weeks = Math.floor(conversionToDays / 7)
    return { number: weeks, format: 'Week' }
  }

  return {
    number: conversionToDays || 1,
    format: 'Day'
  }
}

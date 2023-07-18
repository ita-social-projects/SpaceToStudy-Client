import { SxProps, Theme } from '@mui/material'
import {
  Breakpoints,
  TableColumns,
  FilterFromQuery,
  RemoveColumnRules,
  ScreenBasedLimits,
  UserRole,
  UserRoleEnum,
  Cooperation,
  Offer
} from '~/types'

export const parseJwt = <T,>(token: string): T => {
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

  return JSON.parse(jsonPayload) as T
}

export const parseQueryParams = <T extends object>(
  searchParams: URLSearchParams,
  defaultFilters: T
): FilterFromQuery | null => {
  const filtersFromQuery: FilterFromQuery = {}
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

export const getEmptyValues = <T extends object, R>(
  initialValues: T,
  defaultValue: R
): { [K in keyof T]: R } => {
  return Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: defaultValue }),
    {} as { [K in keyof T]: R }
  )
}

export const findFullObjects = <T extends object>(array: T[]) =>
  array.filter((el) => Object.values(el).every((el) => el))

export const getFormatedDate = (
  date: Date | string,
  locales = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  isCurrentDayHours = false
): string => {
  const currentDate = new Date()
  const formattedDate = new Date(date).toLocaleDateString(locales, options)

  if (
    isCurrentDayHours &&
    currentDate.toDateString() === new Date(date).toDateString()
  ) {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return formattedDate
}

export const getScreenBasedLimit = (
  breakpoints: Breakpoints,
  limits: ScreenBasedLimits
) => {
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

export const ajustColumns = <T extends Cooperation | Offer>(
  breakpoints: Breakpoints,
  columns: TableColumns<T>[],
  rules: RemoveColumnRules<T>
) => {
  const { isDesktop, isTablet, isMobile } = breakpoints
  const removeColumns = (
    rule: RemoveColumnRules<T>[keyof RemoveColumnRules<T>]
  ) => columns.filter(({ label }) => !rule?.includes(label))

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

export const spliceSx = (
  defaultStyles?: SxProps<Theme>,
  newStyles?: SxProps<Theme>
) =>
  ({
    ...defaultStyles,
    ...newStyles
  } as SxProps)

export const studentOrTutor = (userRole: '' | UserRole) =>
  userRole === UserRoleEnum.Tutor ? UserRoleEnum.Tutor : UserRoleEnum.Student

export const getOpositeRole = (role: UserRole | '') =>
  role === UserRoleEnum.Tutor ? UserRoleEnum.Student : UserRoleEnum.Tutor

const createQueryParamsString = (query: { [key: string]: string }) => {
  const queryParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    queryParams.append(key, value)
  })

  return queryParams.toString()
}

export const createUrlPath = (
  URL: string,
  params: string | null = '',
  query = {}
) => {
  const queryParams = createQueryParamsString(query)
  const queryParamsString = queryParams ? `?${queryParams}` : ''
  const paramsString = params ? `/${params}` : ''

  return `${URL}${paramsString}${queryParamsString}`
}

export const ellipsisTextStyle = (linesCount: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const getDifferenceDates = (startDate: Date, endDate: Date) => {
  const difference = new Date(endDate).getTime() - new Date(startDate).getTime()

  const conversionToDays: number = Math.abs(
    Math.round(difference / (1000 * 3600 * 24))
  )

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

import { SxProps, Theme } from '@mui/material'
import {
  Breakpoints,
  TableColumns,
  FilterFromQuery,
  RemoveColumnRules,
  ScreenBasedLimits,
  UserRole,
  UserRoleEnum
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

export const getFormatedDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getScreenBasedLimit = (
  breakpoints: Breakpoints,
  limits: ScreenBasedLimits
) => {
  const { isDesktop, isTablet, isMobile } = breakpoints

  switch (true) {
    case isDesktop:
      return limits.desktop
    case isTablet:
      return limits.tablet
    case isMobile:
      return limits.mobile
    default:
      return limits.default
  }
}

export const ajustColumns = <T extends TableColumns>(
  breakpoints: Breakpoints,
  columns: T[],
  rules: RemoveColumnRules
) => {
  const { isDesktop, isTablet, isMobile } = breakpoints
  const removeColumns = (rule: RemoveColumnRules[keyof RemoveColumnRules]) =>
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

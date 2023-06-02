import { URLSearchParams } from 'node:url'
import { SxProps } from '@mui/material'
import { Breakpoints, FilterFromQuery, ScreenBasedLimits } from '~/types'

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

export const spliceSx = (defaultStyles?: SxProps, newStyles?: SxProps) =>
  ({
    ...defaultStyles,
    ...newStyles
  } as SxProps)

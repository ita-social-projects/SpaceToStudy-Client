import { SxProps, Theme } from '@mui/material'
import i18next from 'i18next'
import {
  Breakpoints,
  ConvertedSize,
  Cooperation,
  FilterFromQuery,
  FormatedDate,
  Lesson,
  Offer,
  Quiz,
  RemoveColumnRules,
  ScreenBasedLimits,
  TableColumn,
  UserRole,
  UserRoleEnum,
  Attachment,
  GroupedByDateItems,
  Question,
  Categories
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
) => {
  return Object.keys(initialValues).reduce(
    (acc, key) => ({ ...acc, [key]: defaultValue }),
    {} as Record<keyof T, R>
  )
}

export const findFullObjects = <T extends object>(array: T[]) =>
  array.filter((el) => Object.values(el).every((el) => el))

const addOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return `${day}th`
  }
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}

const mapper: Record<string, string> = {
  en: 'en-US',
  uk: 'uk-UA'
}

export const getFormattedDate = ({
  date,
  locales = 'en-US',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  },
  isCurrentDayHours = false,
  includeOrdinal = false
}: FormatedDate): string => {
  const get_language = i18next.language
  const language_key = mapper[get_language]
  const currentDate = new Date()
  const formattedDate = new Date(date).toLocaleString(language_key, options)

  if (
    isCurrentDayHours &&
    currentDate.toDateString() === new Date(date).toDateString()
  ) {
    return new Date(date).toLocaleString(locales, {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (includeOrdinal) {
    const day = new Date(date).getDate()
    const month = new Date(date).toLocaleString(locales, { month: 'long' })
    const year = new Date(date).getFullYear()
    const formattedWithOrdinal = `${addOrdinalSuffix(day)} ${month} ${year}`
    return formattedWithOrdinal
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

export const adjustColumns = <
  T extends
    | Cooperation
    | Offer
    | Lesson
    | Attachment
    | Quiz
    | Question
    | Categories
>(
  breakpoints: Breakpoints,
  columns: TableColumn<T>[],
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
  }) as SxProps

export const studentOrTutor = (userRole: '' | UserRole) =>
  userRole === UserRoleEnum.Tutor ? UserRoleEnum.Tutor : UserRoleEnum.Student

export const getOpositeRole = (role: UserRole | '') =>
  role === UserRoleEnum.Tutor ? UserRoleEnum.Student : UserRoleEnum.Tutor

const createQueryParamsString = (query: { [key: string]: string }) => {
  const queryParams = new URLSearchParams()

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value)
    }
  })

  return queryParams.toString()
}

export const createUrlPath = (
  URL: string,
  params: string | null = '',
  query = {}
) => {
  let trimmedUrl = URL
  while (trimmedUrl?.endsWith('/')) {
    trimmedUrl = trimmedUrl.slice(0, -1)
  }

  const queryParams = createQueryParamsString(query)
  const queryParamsString = queryParams ? `?${queryParams}` : ''
  const paramsString = params ? `/${params.replace(/^\/+/g, '')}` : ''

  return `${trimmedUrl}${paramsString}${queryParamsString}`
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

export const convertBytesToProperFormat = (bytes: number): ConvertedSize => {
  const convertedSize = {
    size: bytes.toString(),
    unit: 'bytes'
  }

  const kilobyte = 1024
  const megabyte = kilobyte * 1024

  if (bytes >= megabyte) {
    convertedSize.size = (bytes / megabyte).toFixed(1)
    convertedSize.unit = 'megabytes'
  } else if (bytes >= kilobyte) {
    convertedSize.size = (bytes / kilobyte).toFixed(1)
    convertedSize.unit = 'kilobytes'
  }
  return convertedSize
}

export const getIsNewMonth = (prev: string, curr: string) =>
  new Date(prev).getUTCMonth() !== new Date(curr).getUTCMonth()

export const getIsNewDay = (prev: string, curr: string) =>
  new Date(prev).getUTCDate() !== new Date(curr).getUTCDate()

export const getGroupedByDate = <T extends { createdAt: string }>(
  items: T[],
  func: (prev: string, curr: string) => boolean
) =>
  items.reduce((result: GroupedByDateItems<T>[], item) => {
    const currDate = item.createdAt
    const prevDate = result.length ? result[result.length - 1].date : ''

    if (func(prevDate, currDate)) {
      result.push({ date: currDate, items: [item] })
    } else {
      result[result.length - 1].items.push(item)
    }

    return result
  }, [])

export const parseFileName = (
  fileName: string
): { fileName: string; fileExtension: string } => {
  const fileArr = fileName.split('.')
  return {
    fileName: fileArr.slice(0, -1).join('.'),
    fileExtension: fileArr[fileArr.length - 1]
  }
}

export const getInitials = (firstName: string, lastName: string) =>
  firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : ''

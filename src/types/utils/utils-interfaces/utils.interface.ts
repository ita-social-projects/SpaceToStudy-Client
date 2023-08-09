export interface FormatedDate {
  date: Date | string
  locales?: string
  options?: Intl.DateTimeFormatOptions
  isCurrentDayHours?: boolean
  includeOrdinal?: boolean
}

export interface ConvertedSize {
  size: string
  unit: string
}

export interface GroupedByDateItems<T> {
  date: string
  items: T[]
}

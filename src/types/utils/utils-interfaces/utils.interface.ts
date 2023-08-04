export interface FormatedDate {
  date: Date | string
  locales?: string
  options?: Intl.DateTimeFormatOptions
  isCurrentDayHours?: boolean
  includeOrdinal?: boolean
}

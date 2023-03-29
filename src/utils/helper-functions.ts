import { URLSearchParams } from 'node:url'

export const parseJwt = (token: string) => {
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


type DefaultFilters = {
  sort: string,
  language: string,
  native: string
}
type FilterFromQuery = {
  [key: string]: string | undefined
}
type Filters = DefaultFilters & FilterFromQuery

export const parseQueryParams = (searchParams: URLSearchParams):Filters|null => {
  const filtersFromQuery:FilterFromQuery = {}
  searchParams.forEach((value, key) => {
    filtersFromQuery[key] = value 
  })

  const result = Object.keys(filtersFromQuery).length ? filtersFromQuery : null

  return result
}

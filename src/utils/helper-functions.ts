import { URLSearchParams } from 'node:url'
import { FilterFromQuery } from '~/types'

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

export const parseQueryParams = (searchParams: URLSearchParams):FilterFromQuery|null => {
  const filtersFromQuery:FilterFromQuery = {}
  searchParams.forEach((value, key) => {
    const convertedValue = (key === 'price' || key === 'level') && value.split(',') 
    filtersFromQuery[key] = convertedValue || value
  })

  const result = Object.keys(filtersFromQuery).length ? filtersFromQuery : null

  return result
}

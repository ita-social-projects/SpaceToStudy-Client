import { URLSearchParams } from 'node:url'
import { FilterFromQuery, FindOffersFilters } from '~/types'

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

export const parseQueryParams = (searchParams: URLSearchParams, defaultFilters: FindOffersFilters):FilterFromQuery|null => {
  const filtersFromQuery:FilterFromQuery = {}
  searchParams.forEach((value, key) => {  
    if(key in defaultFilters){
      const convertedValue = (key === 'price' || key === 'level') && value.split(',') 
      filtersFromQuery[key] = convertedValue || value
    }
  })

  const result = Object.keys(filtersFromQuery).length ? filtersFromQuery : null

  return result
}

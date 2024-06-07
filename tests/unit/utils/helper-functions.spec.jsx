import { createUrlPath } from '~/utils/helper-functions'

const baseUrl = 'https://www.google.com'
const resourcePath = 'users'
const expectedUrl = 'https://www.google.com/users'

describe('createUrlPath', () => {
  it('should join base URL without trailing slash and resource path without trailing slash correctly', () => {
    expect(createUrlPath(baseUrl, resourcePath)).toBe(expectedUrl)
  })

  it('should join base URL with trailing slash and resource path without trailing slash correctly', () => {
    expect(createUrlPath(`${baseUrl}/`, resourcePath)).toBe(expectedUrl)
  })

  it('should join base URL without trailing slash and resource path with trailing slash correctly', () => {
    expect(createUrlPath(baseUrl, `/${resourcePath}`)).toBe(expectedUrl)
  })

  it('should join base URL and resource path if both have trailing slashes correctly', () => {
    expect(createUrlPath(`${baseUrl}/`, `/${resourcePath}`)).toBe(expectedUrl)
  })

  it('should join base URL with query parameters correctly', () => {
    const query = { key1: 'value1', key2: 'value2' }

    const expectedUrlWithQuery = `${baseUrl}?key1=value1&key2=value2`
    expect(createUrlPath(baseUrl, null, query)).toBe(expectedUrlWithQuery)
  })
})

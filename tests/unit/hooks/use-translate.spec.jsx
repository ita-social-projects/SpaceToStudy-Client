import { vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useTranslate from '~/hooks/use-translate'

vi.mock('~/utils/translate-data', () => ({
  translateData: (data, entity) => {
    return data.map((item) => ({
      ...item,
      displayName: `${entity}.${item.name}`
    }))
  }
}))

const mockData = [
  { name: 'Category 1', id: 1 },
  { name: 'Category 2', id: 2 }
]

const mockedResponse = [
  { name: 'Category 1', id: 1, displayName: 'categories.Category 1' },
  { name: 'Category 2', id: 2, displayName: 'categories.Category 2' }
]

describe('useTranslate', () => {
  it('should translate data correctly', () => {
    const { result } = renderHook(() => useTranslate('categories'))
    const translatedData = result.current(mockData)

    expect(translatedData).toEqual(mockedResponse)
  })
})

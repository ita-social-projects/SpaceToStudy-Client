import { it, vi, describe, expect } from 'vitest'
import { appApi } from '~/redux/apiSlice'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

vi.mock('@reduxjs/toolkit/query/react', () => {
  const actual = vi.importActual('@reduxjs/toolkit/query/react')

  return {
    ...actual,
    fetchBaseQuery: vi.fn().mockImplementation(() => vi.fn()),
    createApi: vi.fn().mockImplementation(actual.createApi)
  }
})

vi.mock('~/redux/apiSlice', () => {
  const originalModule = vi.importActual('~/redux/apiSlice')

  return {
    ...originalModule,
    appApi: {
      ...originalModule.appApi,
      injectEndpoints: vi.fn().mockImplementation((endpoints) => endpoints)
    }
  }
})

describe('appApi tests', () => {
  it('fetchBaseQuery should be mocked', () => {
    const baseQuery = fetchBaseQuery({ baseUrl: 'https://example.com' })
    expect(baseQuery).toBeInstanceOf(Function)
    expect(fetchBaseQuery).toHaveBeenCalled()
  })

  it('appApi should have mock injectEndpoints', () => {
    expect(appApi.injectEndpoints).toBeInstanceOf(Function)
    appApi.injectEndpoints({ endpoints: () => ({}) })
    expect(appApi.injectEndpoints).toHaveBeenCalled()
  })
})

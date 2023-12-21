import { screen, waitFor } from '@testing-library/react'
import LessonsContainer from '~/containers/my-resources/lessons-container/LessonsContainer'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'

const lessonMock = {
  _id: '64e49ce305b3353b2ae6309e',
  author: '648afee884936e09a37deaaa',
  title: 'eew',
  description: 'dsdfd',
  attachments: [],
  createdAt: '2023-08-22T11:32:51.995Z',
  updatedAt: '2023-08-22T11:32:51.995Z'
}

const responseItemsMock = Array(10)
  .fill()
  .map((_, index) => ({
    ...lessonMock,
    _id: `${index}`,
    title: index + lessonMock.title
  }))

const lessonResponseMock = {
  count: 10,
  items: responseItemsMock
}

vi.mock('~/redux/sliceResources/resources', async () => {
  const actual = await vi.importActual('~/redux/sliceResources/resources')
  return {
    ...actual,
    useGetLessonsQuery: () => ({
      data: lessonResponseMock,
      isLoading: false,
      isSuccess: true,
      refetch: vi.fn()
    })
  }
})

describe('resources rtk test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<LessonsContainer />)
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockAxiosClient.reset()
  })

  it('getLessons endpoint should work correctly', async () => {
    const lessonDataFromRtkHook = await screen.findByText(
      responseItemsMock[5].title
    )

    expect(lessonDataFromRtkHook).toBeInTheDocument()
  })
})

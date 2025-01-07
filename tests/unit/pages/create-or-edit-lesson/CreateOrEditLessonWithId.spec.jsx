import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'
import { ResourceService } from '~/services/resource-service'
import { baseService } from '~/services/base-service'
import { renderWithProviders } from '~tests/test-utils'

const mockParams = {
  id: 'id'
}

const mockLesson = {
  title: 'Lesson 1',
  description: 'Lesson description',
  content: 'Lesson content',
  attachments: [],
  category: null
}

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => mockParams
}))

describe('CreateOrEditLesson with id', () => {
  beforeAll(() => {
    vi.spyOn(baseService, 'request').mockImplementation((config) => {
      if (config.method === 'PATCH') {
        return Promise.resolve()
      }
      if (config.method === 'GET') {
        return Promise.resolve({ data: mockLesson })
      }
      return Promise.reject(new Error('Unexpected request'))
    })
  })

  beforeEach(async () => {
    await renderWithProviders(<CreateOrEditLesson />)
  })

  it('should call ResourceService.getLesson with the correct id when loading the lesson', async () => {
    const getLessonSpy = vi.spyOn(ResourceService, 'getLesson')
    await waitFor(() => renderWithProviders(<CreateOrEditLesson />))

    expect(getLessonSpy).toHaveBeenCalledWith('id')
  })
})

import { screen } from '@testing-library/react'
import { vi } from 'vitest'

import CreateOrEditLesson from '~/pages/create-or-edit-lesson/CreateOrEditLesson'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
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
    mockAxiosClient
      .onGet(URLs.resources.resourcesCategories.getNames)
      .reply(200, [])

    mockAxiosClient
      .onGet(URLs.resources.lessons.getById.replace(':id', mockParams.id))
      .reply(200, mockLesson)

    mockAxiosClient
      .onPatch(URLs.resources.lessons.patch.replace(':id', mockParams.id))
      .reply(204)
  })

  beforeEach(() => {
    renderWithProviders(<CreateOrEditLesson />)
  })

  it('should display the lesson title and description when the lesson is loaded', async () => {
    const lessonTitle = await screen.findByDisplayValue(mockLesson.title)
    const lessonDescription = await screen.findByDisplayValue(
      mockLesson.description
    )

    expect(lessonTitle).toBeInTheDocument()
    expect(lessonDescription).toBeInTheDocument()
  })
})
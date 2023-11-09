import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'

import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import { ResourcesTabsEnum as ResourcesTypes } from '~/types'

const mockedLessonData = [
  {
    _id: '1',
    title: 'Lesson1',
    author: 'some author',
    content: 'Content',
    description: 'Description',
    attachments: [],
    category: null,
    resourceType: ResourcesTypes.Lessons
  }
]

const mockedFunc = vi.fn()

describe('new course section RescourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourcesList items={mockedLessonData} setResources={mockedFunc} />
    )
  })

  it('should render resources list with gragBtn', () => {
    const resourceDragBtn = screen.getByTestId('DragIndicatorIcon')
    expect(resourceDragBtn).toBeInTheDocument()
  })
})

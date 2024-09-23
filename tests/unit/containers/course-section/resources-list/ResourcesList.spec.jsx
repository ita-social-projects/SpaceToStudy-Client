import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'

import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'

import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mokedCooperationData = [
  {
    availability: { status: 'closed', date: null },
    resource: {
      id: '1',
      title: 'Lesson1',
      author: 'some author',
      content: 'Content',
      description: 'Description',
      attachments: [],
      category: null,
      resourceType: ResourceType.Lesson
    },
    resourceType: ResourceType.Lesson
  },
  {
    availability: { status: 'closed', date: null },
    resource: {
      id: '2',
      title: 'Lesson2',
      author: 'new author',
      content: 'Content',
      description: 'Description',
      attachments: [],
      category: null,
      resourceType: ResourceType.Lesson
    },
    resourceType: ResourceType.Lesson
  }
]

const mockedSetResources = vi.fn()

describe('new course section ResourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourcesList
        cooperationData={mokedCooperationData}
        // items={mockedLessonData}
        setResources={mockedSetResources}
      />
    )
  })

  it('should render resources list with gragBtn', async () => {
    const resourceTitle1 = await screen.findByText(
      mokedCooperationData[0].resource.title
    )
    const resourceTitle2 = screen.getByText(
      mokedCooperationData[1].resource.title
    )

    expect(resourceTitle1).toBeInTheDocument()
    expect(resourceTitle2).toBeInTheDocument()
  })
})

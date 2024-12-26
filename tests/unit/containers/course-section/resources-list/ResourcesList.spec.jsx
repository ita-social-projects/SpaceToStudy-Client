import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'

import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'

import { ResourcesTypesEnum as ResourceType } from '~/types'

export const mockedCooperationData = [
  {
    availability: { status: 'open', date: null },
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
const mockSortResources = vi.fn()
const mockDeleteResource = vi.fn()
const mockEditResource = vi.fn()
const mockUpdateAvailability = vi.fn()

describe('new course section ResourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourcesList
        cooperationData={mockedCooperationData}
        setResources={mockedSetResources}
      />
    )
  })

  it('should render resources list with gragBtn', async () => {
    const resourceTitle1 = await screen.findByText(
      mockedCooperationData[0].resource.title
    )
    const resourceTitle2 = screen.getByText(
      mockedCooperationData[1].resource.title
    )

    expect(resourceTitle1).toBeInTheDocument()
    expect(resourceTitle2).toBeInTheDocument()
  })
})
describe('ResourcesList setItems and DragOverlay tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourcesList
        cooperationData={mockedCooperationData}
        sortResources={mockSortResources}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        updateAvailability={mockUpdateAvailability}
        isCooperation={true}
      />
    )
  })

  it('calls sortResources with new items on setItems update', () => {
    const newItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource,
    ]
    mockSortResources(newItems)

    expect(mockSortResources).toHaveBeenCalledWith(newItems)
  })

  it('updates availability for active item on drag start', () => {
    const activeItem = mockedCooperationData[0]

    mockUpdateAvailability(
      activeItem.resource,
      activeItem.availability
    )

    expect(mockUpdateAvailability).toHaveBeenCalledWith(
      activeItem.resource,
      activeItem.availability
    )
  })

  it('updates availability for inactive items after drag ends', () => {
    const inactiveItem = mockedCooperationData[1]

    mockUpdateAvailability(
      inactiveItem.resource,
      inactiveItem.availability
    )

    expect(mockUpdateAvailability).toHaveBeenCalledWith(
      inactiveItem.resource,
      inactiveItem.availability
    )
  })

  it('does not render DragOverlay when no active item', () => {
    const overlayItem = screen.queryByText(mockedCooperationData[0].resource.title)

    expect(overlayItem).not.toBeInTheDocument()
  })
})

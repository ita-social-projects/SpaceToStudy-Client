import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent } from '@testing-library/react'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import { ResourcesTypesEnum as ResourceType } from '~/types'
import { vi } from 'vitest'

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
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        isCooperation
        sortResources={mockSortResources}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })
  it('should call sortResources with new items on setItems update', () => {
    const newItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource
    ]
    mockSortResources(newItems)

    expect(mockSortResources).toHaveBeenCalledWith(newItems)
  })
  it('should call getAvailabilityForActiveItem correctly', () => {
    const getAvailabilityForActiveItem = (id) => {
      return mockedCooperationData.find((item) => item.resource.id === id)
        ?.availability
    }

    const availability = getAvailabilityForActiveItem('1')

    expect(availability).toEqual(mockedCooperationData[0].availability)
  })
  it('should return undefined for non-existent id in getAvailabilityForActiveItem', () => {
    const getAvailabilityForActiveItem = (id) => {
      return mockedCooperationData.find((item) => item.resource.id === id)
        ?.availability
    }
    const notExistAvailability = getAvailabilityForActiveItem('non-existent-id')
    expect(notExistAvailability).toBeUndefined()
  })

  it('should render resources in the correct order after sorting', async () => {
    const sortedItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource
    ]

    mockSortResources(sortedItems)

    expect(mockSortResources).toHaveBeenCalledWith(sortedItems)

    const resourceTitle1 = await screen.findByText(sortedItems[0].title)
    const resourceTitle2 = await screen.findByText(sortedItems[1].title)
    expect(resourceTitle1).toBeInTheDocument()
    expect(resourceTitle2).toBeInTheDocument()
  })
  it('should not change status after drag and drop item', async () => {
    const sortedItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource
    ]
    mockSortResources(sortedItems)
    const activeItem = mockedCooperationData[0]

    if (activeItem.availability) {
      mockUpdateAvailability(activeItem.resource, activeItem.availability)
    }

    if (activeItem.availability) {
      expect(mockUpdateAvailability).toHaveBeenCalledWith(
        activeItem.resource,
        activeItem.availability
      )
    }
    const dragButtons = await screen.findAllByTestId('drag-handle')

    const firstDragButton = dragButtons[0]
    const secondDragButton = dragButtons[1]

    expect(firstDragButton).toBeInTheDocument()
    expect(secondDragButton).toBeInTheDocument()

    fireEvent.dragStart(firstDragButton)
    fireEvent.dragOver(secondDragButton)
    fireEvent.drop(secondDragButton)
    fireEvent.dragEnd(firstDragButton)

    const inputAvailability = await screen.findAllByTestId('app-select')

    expect(inputAvailability[1]).toHaveValue('closed')
  })
})

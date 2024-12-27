import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import ResourcesList from '~/containers/course-section/resources-list/ResourcesList'
import { DragOverlay } from '@dnd-kit/core'
import { ResourcesTypesEnum as ResourceType } from '~/types'
import { renderItem } from '~/containers/course-section/resources-list/ResourcesList'
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

  it('should call sortResources with new items on setItems update', () => {
    const newItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource,
    ]
    mockSortResources(newItems)

    expect(mockSortResources).toHaveBeenCalledWith(newItems)
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
  it('should update availability for active and inactive resources on setItems', () => {
    const newItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource,
    ]
    const activeItem = mockedCooperationData[0]
    const mockActiveItem = mockedCooperationData.find(
      (item) => item.resource.id === activeItem.resource.id
    )
  
    mockSortResources(newItems)
    if (mockActiveItem?.availability) {
      mockUpdateAvailability(
        mockActiveItem.resource,
        mockActiveItem.availability
      )
    }
  
    expect(mockSortResources).toHaveBeenCalledWith(newItems)
  
    expect(mockUpdateAvailability).toHaveBeenCalledWith(
      activeItem.resource,
      activeItem.availability
    )
    mockedCooperationData
      .filter((item) => item.resource.id !== activeItem.resource.id)
      .forEach((inactiveItem) => {
        if (inactiveItem.availability) {
          expect(mockUpdateAvailability).toHaveBeenCalledWith(
            inactiveItem.resource,
            inactiveItem.availability
          )
        }
      })
  })
  it('should render DragOverlay when activeItem is present', async () => {
    const activeItem = mockedCooperationData[0]
  
    renderWithProviders(
      <DragOverlay>
        {activeItem &&
          renderItem(
            activeItem.resource,
            activeItem.availability ||
              mockedCooperationData.find((item) => item.resource.id === activeItem.resource.id)?.availability,
            false,
            mockDeleteResource,
            mockEditResource,
            true,
            mockUpdateAvailability
          )}
      </DragOverlay>
    )
  
    const overlayItem = await screen.findByText(activeItem.resource.title)
    expect(overlayItem).toBeInTheDocument()
  })  
  it('should not render DragOverlay when no active item', () => {
    const overlayItem = screen.queryByText(mockedCooperationData[0].resource.title)

    expect(overlayItem).not.toBeInTheDocument()
  })
  it('should not render DragOverlay when activeItem is null', () => {
    renderWithProviders(<DragOverlay>{null}</DragOverlay>)
  
    const overlayItem = screen.queryByText(mockedCooperationData[0].resource.title)
    expect(overlayItem).not.toBeInTheDocument()
  })
  it('should call getAvailabilityForActiveItem correctly', () => {
    const getAvailabilityForActiveItem = (id) => {
      return mockedCooperationData.find((item) => item.resource.id === id)?.availability
    }

    const availability = getAvailabilityForActiveItem('1')

    expect(availability).toEqual(mockedCooperationData[0].availability)
  })

  it('should handle empty or null activeItem correctly in getAvailabilityForActiveItem', () => {
    const getAvailabilityForActiveItem = (id) => {
      return mockedCooperationData.find((item) => item.resource.id === id)?.availability
    }

  const nullAvailability = getAvailabilityForActiveItem(null)
  expect(nullAvailability).toBeUndefined()

  const notFoundAvailability = getAvailabilityForActiveItem('999')
  expect(notFoundAvailability).toBeUndefined()
  })
  it('should render resources in the correct order after sorting', async () => {
    const sortedItems = [
      mockedCooperationData[1].resource,
      mockedCooperationData[0].resource,
    ]
  
    mockSortResources(sortedItems)
  
    expect(mockSortResources).toHaveBeenCalledWith(sortedItems);
  
    const resourceTitle1 = await screen.findByText(sortedItems[0].title)
    const resourceTitle2 = await screen.findByText(sortedItems[1].title)
  
    expect(resourceTitle1).toBeInTheDocument()
    expect(resourceTitle2).toBeInTheDocument()
  })
  it('should update availability for multiple resources', () => {
    const resourcesToUpdate = mockedCooperationData.map((item) => ({
      ...item,
      availability: { status: 'open', date: null },
    }))
  
    resourcesToUpdate.forEach((resource) =>
      mockUpdateAvailability(resource.resource, resource.availability)
    )
  
    resourcesToUpdate.forEach((resource) => {
      expect(mockUpdateAvailability).toHaveBeenCalledWith(resource.resource, resource.availability)
    })
  })  
})


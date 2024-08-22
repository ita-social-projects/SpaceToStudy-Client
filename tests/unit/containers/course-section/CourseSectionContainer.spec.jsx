import {
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { CourseResourceEventType } from '~/types'
import {
  mockedSectionData,
  mockedUpdatedResources
} from '~tests/unit/containers/course-section/CourseSectionContainer.spec.constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { resourceNavigationMap } from '~/containers/course-section/CourseSectionContainer.constants'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'

const mockedHandleSectionInputChange = vi.fn()
const mockedResourceEventHandler = vi.fn()
const mockedSectionEventHandler = vi.fn()

vi.mock(
  '~/containers/course-section/resources-list/ResourcesList',
  async () => {
    const ResourcesList = (
      await vi.importActual(
        '~/containers/course-section/resources-list/ResourcesList'
      )
    ).default
    return {
      __esModule: true,
      default: (props) => (
        <>
          <ResourcesList
            deleteResource={props.deleteResource}
            editResource={props.editResource}
            isCooperation={props.isCooperation}
            items={props.items}
            sortResources={props.sortResources}
            updateAvailability={props.updateAvailability}
          />
          <input
            data-testid='mock-ResourcesList'
            onChange={(e) => {
              const parsed = JSON.parse(e.target.value)
              if (props[parsed.event]) {
                props[parsed.event](parsed.payload)
              }
            }}
          />
        </>
      )
    }
  }
)

describe('CourseSectionContainer tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <CourseSectionContainer
        handleSectionInputChange={mockedHandleSectionInputChange}
        isCooperation
        resourceEventHandler={mockedResourceEventHandler}
        sectionData={mockedSectionData}
        sectionEventHandler={mockedSectionEventHandler}
      />
    )
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should render inputs for title and description', () => {
    const titleInput = screen.getByDisplayValue(mockedSectionData.title)
    const labelInput = screen.getByDisplayValue(mockedSectionData.description)

    expect(titleInput).toBeInTheDocument()
    expect(labelInput).toBeInTheDocument()
  })

  it('should display default new description when description is not provided', () => {
    const sectionDataWithoutDescription = { ...mockedSectionData }
    delete sectionDataWithoutDescription.description

    cleanup()
    renderWithProviders(
      <CourseSectionContainer
        handleSectionInputChange={mockedHandleSectionInputChange}
        isCooperation
        resourceEventHandler={mockedResourceEventHandler}
        sectionData={sectionDataWithoutDescription}
        sectionEventHandler={mockedSectionEventHandler}
      />
    )
    const defaultDescription = screen.getByText(
      /course\.coursesection\.defaultnewdescription/i
    )

    expect(defaultDescription).toBeInTheDocument()
  })

  it('should call handleSectionInputChange with the correct arguments when the title input is changed', () => {
    const titleInput = screen.getByDisplayValue(mockedSectionData.title)
    act(() =>
      fireEvent.change(titleInput, {
        target: {
          value: 'New title'
        }
      })
    )
    act(() => fireEvent.blur(titleInput))

    expect(mockedHandleSectionInputChange).toHaveBeenCalledWith(
      mockedSectionData.id,
      'title',
      'New title'
    )
  })

  it('should call handleSectionInputChange with the correct arguments when the description input is blurred', () => {
    const descriptionInput = screen.getByDisplayValue(
      mockedSectionData.description
    )
    act(() =>
      fireEvent.change(descriptionInput, {
        target: {
          value: 'New description'
        }
      })
    )
    act(() => fireEvent.blur(descriptionInput))

    expect(mockedHandleSectionInputChange).toHaveBeenCalledWith(
      mockedSectionData.id,
      'description',
      'New description'
    )
  })

  it('should render availability status for each resource', async () => {
    await waitFor(() => {
      const allMenuAvailabilityStatus = screen.getAllByTestId('app-select')
      allMenuAvailabilityStatus.forEach((resource, index) => {
        const resourceStatus =
          mockedSectionData.resources[index].resource.availability.status
        expect(resource).toHaveValue(resourceStatus)
      })
    })
  })

  it('should call handleSectionInputChange with the correct arguments when the resource status is changed', async () => {
    const activityIndexToChange = 1
    await waitFor(() => {
      const allMenuAvailabilityStatus = screen.getAllByTestId('app-select')
      const menuAvailabilityToChange =
        allMenuAvailabilityStatus[activityIndexToChange]

      act(() =>
        fireEvent.change(menuAvailabilityToChange, {
          target: { value: 'closed' }
        })
      )
      act(() => fireEvent.blur(menuAvailabilityToChange))
    })

    expect(mockedResourceEventHandler).toHaveBeenCalledTimes(1)
    expect(mockedResourceEventHandler).toHaveBeenCalledWith({
      resource: {
        availability: {
          date: null,
          status: 'closed'
        }
      },
      resourceId:
        mockedSectionData.resources[activityIndexToChange].resource._id,
      sectionId: 1,
      type: 'resourceUpdated'
    })
  })

  it('should render menu button and menu', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    act(() => fireEvent.click(addResourcesBtn))
    const menuList = screen.getByRole('menu')

    expect(menuList).toBeInTheDocument()
  })

  it('should close menu after click', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    act(() => fireEvent.click(addResourcesBtn))
    const menuListItem = screen.getAllByRole('menuitem')[0]
    act(() => fireEvent.click(menuListItem))

    expect(menuListItem).not.toBeVisible()
  })

  it('should hide section content', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    const hideBtn = screen.getAllByRole('button')[0]
    act(() => fireEvent.click(hideBtn))

    expect(addResourcesBtn).not.toBeVisible()
  })

  it('should call event handler with properly type when the delete button is clicked on section', () => {
    const deleteMenu = screen.getByTestId('MoreVertIcon').parentElement
    act(() => fireEvent.click(deleteMenu))
    const deleteButton = screen.getByTestId('DeleteOutlineIcon').parentElement
    act(() => fireEvent.click(deleteButton))

    expect(mockedSectionEventHandler).toHaveBeenCalledWith({
      sectionId: 1,
      type: 'sectionRemoved'
    })
  })

  it('should show add lessons modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    act(() => fireEvent.click(addResourcesBtn))
    const addLessonBtn = screen.getByText(
      'course.courseSection.resourcesMenu.lessonMenuItem'
    ).parentElement
    act(() => fireEvent.click(addLessonBtn))
    const addLessonModal = screen.getByText('myResourcesPage.lessons.add')

    expect(addLessonModal).toBeInTheDocument()
  })

  it('should show add quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    act(() => fireEvent.click(addResourcesBtn))
    const addQuizBtn = screen.getByText(
      'course.courseSection.resourcesMenu.quizMenuItem'
    ).parentElement
    act(() => fireEvent.click(addQuizBtn))
    const addQuizModal = screen.getByText('myResourcesPage.quizzes.add')

    expect(addQuizModal).toBeInTheDocument()
  })

  it('should show attachments quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    act(() => fireEvent.click(addResourcesBtn))
    const addAttachmentBtn = screen.getByText(
      'course.courseSection.resourcesMenu.attachmentMenuItem'
    ).parentElement
    act(() => fireEvent.click(addAttachmentBtn))
    const addAttachmentModal = screen.getByText(
      'myResourcesPage.attachments.add'
    )

    expect(addAttachmentModal).toBeInTheDocument()
  })

  it('should delete lesson and call event handler with properly type when the delete button is clicked on lesson', async () => {
    await waitFor(() => {
      const lessonDelete = screen.getAllByTestId('CloseIcon')[0].parentElement
      act(() => fireEvent.click(lessonDelete))
    })
    expect(mockedResourceEventHandler).toHaveBeenCalledWith({
      resourceId: mockedSectionData.resources[0].resource._id,
      sectionId: 1,
      type: 'resourceRemoved'
    })
  })

  it('should delete quiz and call event handler with properly type when the delete button is clicked on quiz', async () => {
    await waitFor(() => {
      const quizDelete = screen.getAllByTestId('CloseIcon')[1].parentElement
      act(() => fireEvent.click(quizDelete))
    })
    expect(mockedResourceEventHandler).toHaveBeenCalledWith({
      resourceId: mockedSectionData.resources[1].resource._id,
      sectionId: 1,
      type: 'resourceRemoved'
    })
  })

  it('should delete attachment and call event handler with properly type when the delete button is clicked on attachment', async () => {
    await waitFor(() => {
      const attachmentDelete =
        screen.getAllByTestId('CloseIcon')[2].parentElement
      act(() => fireEvent.click(attachmentDelete))
    })
    expect(mockedResourceEventHandler).toHaveBeenCalledWith({
      resourceId: mockedSectionData.resources[2].resource._id,
      sectionId: 1,
      type: 'resourceRemoved'
    })
  })
})

describe('Testing CourseSectionContainer Event Handlers', () => {
  const mockSectionId = mockedSectionData.id
  beforeEach(() => {
    renderWithProviders(
      <CourseSectionContainer
        handleSectionInputChange={mockedHandleSectionInputChange}
        isCooperation
        resourceEventHandler={mockedResourceEventHandler}
        sectionData={mockedSectionData}
        sectionEventHandler={mockedSectionEventHandler}
      />
    )
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should handle resource update event [CourseResourceEventType.ResourceUpdated]', async () => {
    const updatedResource = mockedSectionData.resources[0].resource
    const newAvailability = 'closed'

    await waitFor(() => {
      const availabilitySelect = screen.getAllByTestId('app-select')[0]
      fireEvent.change(availabilitySelect, {
        target: { value: newAvailability }
      })
      fireEvent.blur(availabilitySelect)
    })

    expect(mockedResourceEventHandler).toHaveBeenCalledTimes(1)
    expect(mockedResourceEventHandler).toHaveBeenCalledWith({
      type: CourseResourceEventType.ResourceUpdated,
      sectionId: mockSectionId,
      resourceId: updatedResource._id,
      resource: {
        availability: {
          ...updatedResource.availability,
          status: newAvailability
        }
      }
    })
  })

  it('should handle resource order change event [CourseResourceEventType.ResourcesOrderChange]', async () => {
    fireEvent.change(screen.getByTestId('mock-ResourcesList'), {
      target: {
        value: JSON.stringify({
          event: 'sortResources',
          payload: {
            type: CourseResourceEventType.ResourcesOrderChange,
            sectionId: mockSectionId,
            resources: mockedUpdatedResources
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockedResourceEventHandler).toHaveBeenCalledTimes(1)
      expect(mockedResourceEventHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: CourseResourceEventType.ResourcesOrderChange,
          sectionId: mockSectionId,
          resources: expect.objectContaining({
            resources: expect.arrayContaining([
              expect.objectContaining({
                _id: expect.any(String),
                resourceType: expect.any(String)
              })
            ])
          })
        })
      )
    })
  })

  it('should handle resource remove event [CourseResourceEventType.ResourceRemoved]', async () => {
    fireEvent.change(screen.getByTestId('mock-ResourcesList'), {
      target: {
        value: JSON.stringify({
          event: 'deleteResource',
          payload: {
            type: CourseResourceEventType.ResourceRemoved,
            sectionId: mockSectionId,
            resourceId: mockedSectionData.resources[0]._id
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockedResourceEventHandler).toHaveBeenCalledTimes(1)
      expect(mockedResourceEventHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: CourseResourceEventType.ResourceRemoved,
          sectionId: mockSectionId,
          resourceId: mockedSectionData.resources[0]._id
        })
      )
    })
  })

  it('should handle edit resource event when resourceType is not Attachment', async () => {
    const resource = mockedSectionData.resources[0].resource
    const editResourceSpy = vi
      .spyOn(window, 'open')
      .mockImplementation(() => ({ focus: vi.fn() }))

    fireEvent.change(screen.getByTestId('mock-ResourcesList'), {
      target: {
        value: JSON.stringify({
          event: 'editResource',
          payload: resource
        })
      }
    })

    await waitFor(() => {
      expect(editResourceSpy).toHaveBeenCalledTimes(1)
      expect(editResourceSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          authRoutes.myResources[resourceNavigationMap[resource.resourceType]]
            .path
        ),
        '_blank'
      )
    })
  })

  it('should handle edit resource event when resourceType is Attachment', async () => {
    const resource = mockedSectionData.resources[2].resource

    fireEvent.change(screen.getByTestId('mock-ResourcesList'), {
      target: {
        value: JSON.stringify({
          event: 'editResource',
          payload: resource
        })
      }
    })

    await waitFor(() => {
      expect(
        screen.getByText('myResourcesPage.attachments.edit')
      ).toBeInTheDocument()
    })
  })
})

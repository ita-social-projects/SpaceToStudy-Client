import {
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'
import { ResourcesTypesEnum as ResourceType } from '~/types'

const mockedSectionData = {
  id: 1,
  title: 'Title',
  description: 'Description',
  resources: [
    {
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64cd12f1fad091e0sfe12134',
        title: 'Lesson1',
        author: 'some author',
        content: 'Content',
        description: 'Description',
        attachments: [],
        category: null
      },
      resourceType: ResourceType.Lesson
    },
    {
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64fb2c33eba89699411d22bb',
        title: 'Quiz',
        description: '',
        items: [],
        author: '648afee884936e09a37deaaa',
        category: { id: '64fb2c33eba89699411d22bb', name: 'Music' },
        createdAt: '2023-09-08T14:14:11.373Z',
        updatedAt: '2023-09-08T14:14:11.373Z'
      },
      resourceType: ResourceType.Quiz
    },
    {
      resource: {
        availability: {
          status: 'open',
          date: null
        },
        _id: '64cd12f1fad091e0ee719830',
        author: '6494128829631adbaf5cf615',
        fileName: 'spanish.pdf',
        link: 'link',
        category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
        description: 'Mock description for attachments',
        size: 100,
        createdAt: '2023-07-25T13:12:12.998Z',
        updatedAt: '2023-07-25T13:12:12.998Z'
      },
      resourceType: ResourceType.Attachment
    }
  ]
}

const mockedHandleSectionInputChange = vi.fn()
const mockedResourceEventHandler = vi.fn()
const mockedSectionEventHandler = vi.fn()

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

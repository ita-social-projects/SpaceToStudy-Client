import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent, waitFor } from '@testing-library/react'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'

const mockedSectionData = {
  id: 1,
  title: 'Title',
  description: 'Description',
  lessons: [
    {
      _id: '1',
      title: 'Lesson1',
      author: 'some author',
      content: 'Content',
      description: 'Description',
      attachments: [],
      category: null,
      resourceType: 'lessons'
    }
  ],
  quizzes: [
    {
      _id: '64fb2c33eba89699411d22bb',
      title: 'Quiz',
      description: '',
      items: [],
      author: '648afee884936e09a37deaaa',
      category: { id: '64fb2c33eba89699411d22bb', name: 'Music' },
      createdAt: '2023-09-08T14:14:11.373Z',
      updatedAt: '2023-09-08T14:14:11.373Z',
      resourceType: 'quizzes'
    }
  ],
  attachments: [
    {
      _id: '64cd12f1fad091e0ee719830',
      author: '6494128829631adbaf5cf615',
      fileName: 'spanish.pdf',
      link: 'link',
      category: { id: '64fb2c33eba89699411d22bb', name: 'History' },
      description: 'Mock description for attachments',
      size: 100,
      createdAt: '2023-07-25T13:12:12.998Z',
      updatedAt: '2023-07-25T13:12:12.998Z',
      resourceType: 'attachments'
    }
  ],
  order: ['1', '64fb2c33eba89699411d22bb', '64cd12f1fad091e0ee719830']
}

const mockedHandleSectionInputChange = vi.fn()
const mockedHandleSectionNonInputChange = vi.fn()
const mockedHandleSectionResourcesOrder = vi.fn()

const mockedSections = Array(2)
  .fill()
  .map((_, index) => ({
    ...mockedSectionData,
    _id: `${index}`,
    title: `${mockedSectionData.title}${index}`,
    description: `${mockedSectionData.description}${index}`
  }))

const mockedSetSectionItems = vi.fn()

describe('CourseSectionContainer tests', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <CourseSectionContainer
          handleSectionInputChange={mockedHandleSectionInputChange}
          handleSectionNonInputChange={mockedHandleSectionNonInputChange}
          handleSectionResourcesOrder={mockedHandleSectionResourcesOrder}
          sectionData={mockedSectionData}
          sections={mockedSections}
          setSectionsItems={mockedSetSectionItems}
        />
      )
    })
  })

  it('should render inputs for title and description', () => {
    const titleInput = screen.getByDisplayValue(mockedSectionData.title)
    const labelInput = screen.getByDisplayValue(mockedSectionData.description)

    expect(titleInput).toBeInTheDocument()
    expect(labelInput).toBeInTheDocument()
  })

  it('should render menu button and menu', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    fireEvent.click(addResourcesBtn)
    const menuList = screen.getByRole('menu')

    expect(menuList).toBeInTheDocument()
  })

  it('should close menu after click', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    waitFor(() => fireEvent.click(addResourcesBtn))

    const menuListItem = screen.getAllByRole('menuitem')[0]

    waitFor(() => fireEvent.click(menuListItem))

    expect(menuListItem).not.toBeVisible()
  })

  it('should hide section content', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    const hideBtn = screen.getAllByRole('button')[0]
    fireEvent.click(hideBtn)

    expect(addResourcesBtn).not.toBeVisible()
  })

  it('should set section items on delete', async () => {
    const deleteMenu = screen.getByTestId('MoreVertIcon').parentElement
    fireEvent.click(deleteMenu)
    const deleteButton = screen.getByTestId('DeleteOutlineIcon').parentElement
    fireEvent.click(deleteButton)

    expect(mockedSetSectionItems).toHaveBeenCalled()
  })

  it('should show add lessons modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    waitFor(() => fireEvent.click(addResourcesBtn))

    const addLessonBtn = screen.getByText(
      'course.courseSection.resourcesMenu.lessonMenuItem'
    ).parentElement

    waitFor(() => fireEvent.click(addLessonBtn))

    const addLessonModal = screen.getByText('myResourcesPage.lessons.add')

    expect(addLessonModal).toBeInTheDocument()
  })

  it('should show add quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    waitFor(() => fireEvent.click(addResourcesBtn))

    const addQuizBtn = screen.getByText(
      'course.courseSection.resourcesMenu.quizMenuItem'
    ).parentElement

    waitFor(() => fireEvent.click(addQuizBtn))

    const addQuizModal = screen.getByText('myResourcesPage.quizzes.add')

    expect(addQuizModal).toBeInTheDocument()
  })

  it('should show attachments quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )

    waitFor(() => fireEvent.click(addResourcesBtn))

    const addAttachmentBtn = screen.getByText(
      'course.courseSection.resourcesMenu.attachmentMenuItem'
    ).parentElement

    waitFor(() => fireEvent.click(addAttachmentBtn))

    const addAttachmentModal = screen.getByText(
      'myResourcesPage.attachments.add'
    )

    expect(addAttachmentModal).toBeInTheDocument()
  })

  it('should delete lesson', () => {
    waitFor(() => {
      const lessonDelete = screen.getAllByTestId('CloseIcon')[0].parentElement

      fireEvent.click(lessonDelete)
    })

    waitFor(() => {
      expect(mockedHandleSectionNonInputChange).toHaveBeenCalled()
    })
  })

  it('it should delete quiz', () => {
    waitFor(() => {
      const quizDelete = screen.getAllByTestId('CloseIcon')[1].parentElement

      fireEvent.click(quizDelete)
    })

    expect(mockedHandleSectionNonInputChange).toHaveBeenCalled()
  })

  it('it should delete attachment', () => {
    waitFor(() => {
      const attachmentDelete =
        screen.findAllByTestId('CloseIcon')[2].parentElement

      fireEvent.click(attachmentDelete)
    })

    expect(mockedHandleSectionNonInputChange).toHaveBeenCalled()
  })
})

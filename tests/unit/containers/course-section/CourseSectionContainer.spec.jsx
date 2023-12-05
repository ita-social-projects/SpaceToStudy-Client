import { renderWithProviders } from '~tests/test-utils'
import { screen, fireEvent } from '@testing-library/react'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'

const mockedSectionData = {
  id: 1,
  title: 'Title',
  description: 'Description',
  lessons: [],
  quizzes: [],
  attachments: []
}

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
  beforeEach(() => {
    renderWithProviders(
      <CourseSectionContainer
        sectionData={mockedSectionData}
        sections={mockedSections}
        setSectionsItems={mockedSetSectionItems}
      />
    )
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
    fireEvent.click(addResourcesBtn)
    const menuListItem = screen.getAllByRole('menuitem')[0]
    fireEvent.click(menuListItem)

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
    fireEvent.click(addResourcesBtn)
    const addLessonBtn = screen.getByText(
      'course.courseSection.resourcesMenu.lessonMenuItem'
    ).parentElement
    fireEvent.click(addLessonBtn)
    const addLessonModal = screen.getByText('myResourcesPage.lessons.add')

    expect(addLessonModal).toBeInTheDocument()
  })

  it('should show add quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    fireEvent.click(addResourcesBtn)
    const addQuizBtn = screen.getByText(
      'course.courseSection.resourcesMenu.quizMenuItem'
    ).parentElement
    fireEvent.click(addQuizBtn)
    const addQuizModal = screen.getByText('myResourcesPage.quizzes.add')

    expect(addQuizModal).toBeInTheDocument()
  })

  it('should show attachments quizzes modal', () => {
    const addResourcesBtn = screen.getByText(
      'course.courseSection.addResourceBtn'
    )
    fireEvent.click(addResourcesBtn)
    const addAttachmentBtn = screen.getByText(
      'course.courseSection.resourcesMenu.attachmentMenuItem'
    ).parentElement
    fireEvent.click(addAttachmentBtn)
    const addAttachmentModal = screen.getByText(
      'myResourcesPage.attachments.add'
    )

    expect(addAttachmentModal).toBeInTheDocument()
  })
})

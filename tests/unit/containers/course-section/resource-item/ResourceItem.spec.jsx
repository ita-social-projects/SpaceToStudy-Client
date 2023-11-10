import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { ResourcesTabsEnum as ResourcesTypes } from '~/types'

const mockedLessonData = {
  _id: '1',
  title: 'Lesson1',
  author: 'some author',
  content: 'Content',
  description: 'Description',
  attachments: [],
  category: null,
  resourceType: ResourcesTypes.Lessons
}

const mockedFunc = vi.fn()

describe('new course section RescourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem resource={mockedLessonData} setItemToDelete={mockedFunc} />
    )
  })

  it('should render added resource', () => {
    const resourceTitle = screen.getByText(mockedLessonData.title)
    expect(resourceTitle).toBeInTheDocument()
  })

  it('should display lesson icon', () => {
    const lessonIcon = screen.getByTestId('ListAltIcon')
    expect(lessonIcon).toBeInTheDocument()
  })

  it('should call delete resource function', () => {
    const deleteButton = screen.getByRole('button')

    fireEvent.click(deleteButton)

    expect(mockedFunc).toHaveBeenCalledWith(mockedLessonData)
  })

  it('should display quiz icon', () => {
    mockedLessonData.resourceType = ResourcesTypes.Quizzes
    renderWithProviders(
      <ResourceItem resource={mockedLessonData} setItemToDelete={mockedFunc} />
    )
    const quizIcon = screen.getByTestId('NoteAltOutlinedIcon')

    expect(quizIcon).toBeInTheDocument()
  })
})

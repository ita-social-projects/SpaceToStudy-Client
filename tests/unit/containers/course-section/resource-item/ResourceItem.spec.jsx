import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { ResourcesTypesEnum as ResourceType } from '~/types'

const mockedLessonData = {
  _id: '1',
  title: 'Lesson1',
  author: 'some author',
  content: 'Content',
  description: 'Description',
  attachments: [],
  category: null,
  resourceType: ResourceType.Lesson
}

const mockedSetResourceAvailability = vi.fn()

const mockedDeleteFunc = vi.fn()
const mockedEditFunc = vi.fn()

describe('new course section ResourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        deleteResource={mockedDeleteFunc}
        editResource={mockedEditFunc}
        resource={mockedLessonData}
        setResourceAvailability={mockedSetResourceAvailability}
      />
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
    const deleteButton = screen.getByLabelText('delete')

    fireEvent.click(deleteButton)

    expect(mockedDeleteFunc).toHaveBeenCalledTimes(1)
  })

  it('should call edit resource function', () => {
    const editButton = screen.getByLabelText('edit')

    fireEvent.click(editButton)

    expect(mockedEditFunc).toHaveBeenCalledTimes(1)
  })
})

describe('should render quiz component', () => {
  it('should display quiz icon', () => {
    mockedLessonData.resourceType = ResourceType.Quiz

    renderWithProviders(
      <ResourceItem
        resource={mockedLessonData}
        setItemToDelete={mockedDeleteFunc}
        setResourceAvailability={mockedSetResourceAvailability}
      />
    )

    const quizIcon = screen.getByTestId('NoteAltOutlinedIcon')

    expect(quizIcon).toBeInTheDocument()
  })
})

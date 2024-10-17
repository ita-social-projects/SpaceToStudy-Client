import {
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup
} from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CourseSectionContainer from '~/containers/course-section/CourseSectionContainer'
import { mockedDuplicatedSectionData } from './CourseSectionContainer.spec.constants'

const mockedResourceEventHandler = vi.fn()

const resources = [
  {
    title: 'Lesson',
    description: 'Lesson description',
    content: 'Lesson content'
  },
  {
    title: 'Lesson',
    description: 'Lesson description',
    content: 'Lesson content',
    resourceType: 'lesson'
  },
  {
    title: 'Quiz',
    description: 'Quiz description',
    content: 'Quiz content',
    resourceType: 'quiz'
  }
]

vi.mock('~/containers/add-resources/AddResources', () => ({
  default: ({ onAddResources }) => (
    <div>
      <button
        data-testid='addResource'
        onClick={() => onAddResources(resources, true)}
      >
        Add
      </button>
    </div>
  )
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    addLesson: vi.fn().mockResolvedValue({ data: { id: 'lesson-1' } }),
    addQuiz: vi.fn().mockResolvedValue({ data: { id: 'quiz-1' } })
  }
}))

describe('HandleAdd tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <CourseSectionContainer
        isCooperation
        resourceEventHandler={mockedResourceEventHandler}
        sectionData={mockedDuplicatedSectionData}
      />
    )
  })

  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should add different duplicate resources when Add button is clicked', async () => {
    await waitFor(() => {
      const addButton = screen.getByText('course.courseSection.addResourceBtn')
      fireEvent.click(addButton)

      const menuListItem = screen.getAllByRole('menuitem')[0]
      act(() => fireEvent.click(menuListItem))
      const button = screen.getByTestId('addResource')
      act(() => fireEvent.click(button))

      expect(mockedResourceEventHandler).toHaveBeenCalledTimes(3)
    })
  })
})

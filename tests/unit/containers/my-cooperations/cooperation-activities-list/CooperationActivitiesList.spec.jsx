import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { ResourcesTypesEnum as ResourceType } from '~/types'

const originalDateNow = Date.now
Date.now = () => 1487076708000

const TestsId = {
  addButton: 'Add activity',
  activityContainer: 'addActivity-container',
  closeIcon: 'CloseIcon'
}

const mockedCourseData = {
  title: 'Course title',
  description: 'Course description',
  sections: [
    {
      title: 'Course section1 title',
      description: 'Course section1 description',
      resources: [],
      id: '17121748017182'
    }
  ]
}

const renderWithMockData = (
  sectionIndex,
  sections = [],
  courseData = mockedCourseData,
  isAddedClicked = true,
  isNewActivity = true
) => {
  renderWithProviders(<CooperationActivitiesList />, {
    preloadedState: {
      cooperations: {
        selectedCourse: courseData,
        isAddedClicked: isAddedClicked,
        isNewActivity: isNewActivity,
        currentSectionIndex: sectionIndex,
        sections: sections
      }
    }
  })
}

describe('CooperationActivitiesList with section data', () => {
  const mockedSectionsData = [
    {
      title: 'Section1',
      description: 'Section1 description',
      resources: [
        {
          resource: {
            _id: '66183816fb40f35f91bb77ce',
            title: 'Lesson 1',
            description: 'Lesson 1 description',
            content: 'Lesson 1 content'
          },
          resourceType: ResourceType.Lesson
        }
      ],
      id: '17121748017180'
    },
    {
      title: 'Section2 title',
      description: 'Section2 description',
      resources: [],
      id: '17121748017181'
    }
  ]

  beforeEach(() => {
    renderWithMockData(0, mockedSectionsData)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should add a new section when Add activity button is clicked', async () => {
    let sections = await screen.findAllByTestId(TestsId.activityContainer)

    const [hoverElement] = sections
    fireEvent.mouseOver(hoverElement)

    const [addButton] = screen.getAllByTestId(TestsId.addButton)
    fireEvent.click(addButton)

    const [menuItem] = await screen.findAllByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem)

    sections = await screen.findAllByTestId(TestsId.activityContainer)
    expect(sections.length).toBe(4)
  })

  it('should delete section resource', async () => {
    await waitFor(() => {
      const deleteResourceBtn = screen.getByTestId(
        TestsId.closeIcon
      ).parentElement
      fireEvent.click(deleteResourceBtn)
    })

    const resource = screen.queryByText('Lesson 1 description')

    await waitFor(() => {
      expect(resource).not.toBeInTheDocument()
    })
  })

  it('should change the activity title', async () => {
    const titleInput = await screen.findByDisplayValue(
      mockedSectionsData[0].title
    )
    const newTitle = 'New section title'

    fireEvent.blur(titleInput, {
      target: { value: newTitle }
    })

    await waitFor(() => {
      expect(titleInput.value).toBe(newTitle)
    })
  })
})

describe('CooperationActivitiesList without section data', () => {
  const mockedEmptySectionsData = []

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    Date.now = originalDateNow
  })

  it('should set only selected course sections in the data when no section was added', async () => {
    renderWithMockData(0, mockedEmptySectionsData, mockedCourseData, true, true)

    const sections = await screen.findAllByTestId(TestsId.activityContainer)
    expect(sections.length).toBe(1)
  })

  it('should add a new section when no section was added and no course was selected', async () => {
    renderWithMockData(
      0,
      mockedEmptySectionsData,
      { ...mockedCourseData, sections: [] },
      false,
      true
    )

    const sections = await screen.findAllByTestId(TestsId.activityContainer)
    await waitFor(() => {
      expect(sections.length).toBe(1)
    })
  })
})

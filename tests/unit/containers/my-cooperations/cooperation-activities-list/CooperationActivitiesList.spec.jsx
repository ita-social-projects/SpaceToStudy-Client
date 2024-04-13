import { screen, fireEvent, waitFor } from '@testing-library/react'
import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'
import { renderWithProviders } from '~tests/test-utils'
import { sectionInitialData } from '~/pages/create-course/CreateCourse.constants'

const originalDateNow = Date.now
Date.now = () => 1487076708000

const useCooperationContextMock = vi.fn()

vi.mock('~/context/cooperation-context', async () => {
  const actual = await vi.importActual('~/context/cooperation-context')
  return {
    ...actual,
    useCooperationContext: () => useCooperationContextMock()
  }
})

const mockedCourseData = {
  title: 'Course title',
  description: 'Course description',
  sections: [
    {
      title: 'Course section1 title',
      description: 'Course section1 description',
      lessons: [],
      quizzes: [],
      attachments: [],
      id: '17121748017182'
    }
  ]
}

const handleNonInputValueChange = vi.fn()

const renderWithMockData = (
  mockedData,
  sectionIndex,
  isAddedClicked = true
) => {
  useCooperationContextMock.mockReturnValue({
    selectedCourse: mockedCourseData,
    isAddedClicked: isAddedClicked,
    currentSectionIndex: sectionIndex,
    setCurrentSectionIndex: vi.fn()
  })

  renderWithProviders(
    <CooperationActivitiesList
      data={mockedData}
      handleNonInputValueChange={handleNonInputValueChange}
    />
  )
}

describe('CooperationActivitiesList with section data', () => {
  const mockedSectionsData = {
    sections: [
      {
        title: 'Section1 title',
        description: 'Section1 description',
        order: ['66183816fb40f35f91bb77ce'],
        lessons: [
          {
            _id: '66183816fb40f35f91bb77ce',
            title: 'Lesson 1',
            description: 'Lesson 1 description',
            content: 'Lesson 1 content',
            resourceType: 'lessons'
          }
        ],
        quizzes: [],
        attachments: [],
        id: '17121748017180'
      },
      {
        title: 'Section2 title',
        description: 'Section2 description',
        lessons: [],
        quizzes: [],
        attachments: [],
        id: '17121748017181'
      }
    ]
  }

  beforeEach(() => {
    renderWithMockData(mockedSectionsData, 0)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should add a new section when Add activity button is clicked', async () => {
    const [hoverElement] = await screen.findAllByTestId('addActivity-container')
    fireEvent.mouseOver(hoverElement)

    const [addButton] = screen.getAllByText('Add activity')
    fireEvent.click(addButton)

    const [menuItem] = await screen.findAllByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem)

    const sections = await screen.findAllByTestId('addActivity-container')
    expect(sections.length).toBe(2)
  })

  it('should delete section resource', async () => {
    await waitFor(() => {
      const deleteResourceBtn = screen.getByTestId('CloseIcon').parentElement
      fireEvent.click(deleteResourceBtn)
    })

    const resource = screen.queryByText('Lesson 1 description')

    await waitFor(() => {
      expect(resource).not.toBeInTheDocument()
    })
  })

  it('should change the activity title', async () => {
    const titleInput = await screen.findByDisplayValue(
      mockedSectionsData.sections[0].title
    )
    const newTitle = 'New section title'

    fireEvent.blur(titleInput, {
      target: { value: newTitle }
    })

    await waitFor(() => {
      expect(titleInput.value).toBe(newTitle)
    })
  })

  it('should set sections from the data first in order if the current section index is undefined', async () => {
    renderWithMockData(mockedSectionsData, undefined)

    const newSectionData = mockedCourseData.sections.map((section, index) => ({
      ...section,
      id: Date.now().toString() + index
    }))
    const newSections = [...mockedSectionsData.sections, ...newSectionData]

    await waitFor(() => {
      expect(handleNonInputValueChange).toHaveBeenCalledWith(
        'sections',
        newSections
      )
    })
  })

  it('should set sections from the data first in order if a new section index is null', async () => {
    renderWithMockData(mockedSectionsData, null)

    const [hoverElement] = await screen.findAllByTestId('addActivity-container')
    fireEvent.mouseOver(hoverElement)

    const [addButton] = screen.getAllByText('Add activity')
    fireEvent.click(addButton)

    const [menuItem] = await screen.findAllByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem)

    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()
    const newSections = [...mockedSectionsData.sections, newSectionData]

    await waitFor(() => {
      expect(handleNonInputValueChange).toHaveBeenCalledWith(
        'sections',
        newSections
      )
    })
  })
})

describe('CooperationActivitiesList without section data', () => {
  const mockedSectionsData = {
    sections: []
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    Date.now = originalDateNow
  })

  it('should set only selected course sections in the data when no section was added', async () => {
    renderWithMockData(mockedSectionsData, 0)

    const allSections = mockedCourseData.sections.map((section, index) => ({
      ...section,
      id: Date.now().toString() + index
    }))

    await waitFor(() => {
      expect(handleNonInputValueChange).toHaveBeenCalledWith(
        'sections',
        allSections
      )
    })
  })

  it('should add a new section when no section was added and no course was selected', async () => {
    renderWithMockData(mockedSectionsData, 0, false)

    const newSectionData = { ...sectionInitialData }
    newSectionData.id = Date.now().toString()

    await waitFor(() => {
      expect(handleNonInputValueChange).toHaveBeenCalledWith('sections', [
        newSectionData
      ])
    })
  })
})

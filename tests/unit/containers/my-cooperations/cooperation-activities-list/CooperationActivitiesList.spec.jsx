import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { CourseResourceEventType, CourseSectionEventType } from '~/types'
import {
  mockedCourseData,
  mockedSectionsData,
  mockedEmptySectionsData
} from '~tests/unit/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList.spec.constants'

import CooperationActivitiesList from '~/containers/my-cooperations/cooperation-activities-list/CooperationActivitiesList'

const originalDateNow = Date.now
Date.now = () => 1487076708000

const mockedSectionEventHandler = vi.fn()
const mockedResourceEventHandler = vi.fn()

const TestsId = {
  addButton: 'Add activity',
  activityContainer: 'addActivity-container',
  closeIcon: 'CloseIcon'
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
  beforeEach(() => {
    renderWithMockData(0, mockedSectionsData)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should add a new section when Add activity button is clicked', async () => {
    const sections = await screen.findAllByTestId(TestsId.activityContainer)
    const [hoverElement] = sections
    fireEvent.mouseOver(hoverElement)

    const [addButton] = screen.getAllByTestId(TestsId.addButton)
    fireEvent.click(addButton)

    const [menuItem] = await screen.findAllByText(
      'cooperationsPage.manyTypes.module'
    )
    fireEvent.click(menuItem)

    const updatedSections = await screen.findAllByTestId(
      TestsId.activityContainer
    )
    expect(updatedSections.length).toBe(4)
  })

  it('should delete section resource', async () => {
    await waitFor(() => {
      const deleteResourceBtn = screen.getAllByTestId(TestsId.closeIcon)[0]
      fireEvent.click(deleteResourceBtn)
    })

    const resource = screen.queryByText('Lesson 1 description')
    expect(resource).not.toBeInTheDocument()
  })

  it('should change the activity title', async () => {
    const titleInput = await screen.findByDisplayValue(
      mockedSectionsData[0].title
    )
    const newTitle = 'New section title'

    fireEvent.change(titleInput, { target: { value: newTitle } })
    fireEvent.blur(titleInput)

    await waitFor(() => {
      expect(titleInput.value).toBe(newTitle)
    })
  })

  it('should call sectionEventHandler with SectionAdded event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedSectionEventHandler({
      type: CourseSectionEventType.SectionAdded,
      index: 0
    })

    await waitFor(() => {
      expect(mockedSectionEventHandler).toHaveBeenCalledWith({
        type: CourseSectionEventType.SectionAdded,
        index: 0
      })
    })
  })

  it('should call sectionEventHandler with SectionRemoved event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedSectionEventHandler({
      type: CourseSectionEventType.SectionRemoved,
      sectionId: 'section-1'
    })

    await waitFor(() => {
      expect(mockedSectionEventHandler).toHaveBeenCalledWith({
        type: CourseSectionEventType.SectionRemoved,
        sectionId: 'section-1'
      })
    })
  })

  it('should call sectionEventHandler with the correct arguments', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedSectionEventHandler({
      type: CourseSectionEventType.SectionAdded,
      sectionId: 'section-1'
    })

    await waitFor(() => {
      expect(mockedSectionEventHandler).toHaveBeenCalledWith({
        type: CourseSectionEventType.SectionAdded,
        sectionId: 'section-1'
      })
    })
  })

  it('should call sectionEventHandler with SectionsOrderChange event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedSectionEventHandler({
      type: CourseSectionEventType.SectionsOrderChange,
      sections: [
        { id: 'section-2', name: 'Section 2' },
        { id: 'section-1', name: 'Section 1' }
      ]
    })

    await waitFor(() => {
      expect(mockedSectionEventHandler).toHaveBeenCalledWith({
        type: CourseSectionEventType.SectionsOrderChange,
        sections: [
          { id: 'section-2', name: 'Section 2' },
          { id: 'section-1', name: 'Section 1' }
        ]
      })
    })
  })

  it('should call resourceEventHandler with ResourceUpdated event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedResourceEventHandler({
      type: CourseResourceEventType.ResourceUpdated,
      sectionId: 'section-1',
      resourceId: 'resource-1',
      resource: { name: 'Updated Resource' }
    })

    await waitFor(() => {
      expect(mockedResourceEventHandler).toHaveBeenCalledWith({
        type: CourseResourceEventType.ResourceUpdated,
        sectionId: 'section-1',
        resourceId: 'resource-1',
        resource: { name: 'Updated Resource' }
      })
    })
  })

  it('should call resourceEventHandler with ResourcesOrderChange event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedResourceEventHandler({
      type: CourseResourceEventType.ResourcesOrderChange,
      sectionId: 'section-1',
      resources: [{ id: 'resource-1', name: 'Resource 1' }]
    })

    await waitFor(() => {
      expect(mockedResourceEventHandler).toHaveBeenCalledWith({
        type: CourseResourceEventType.ResourcesOrderChange,
        sectionId: 'section-1',
        resources: [{ id: 'resource-1', name: 'Resource 1' }]
      })
    })
  })

  it('should call resourceEventHandler with AddSectionResources event', async () => {
    renderWithProviders(<CooperationActivitiesList />)

    mockedResourceEventHandler({
      type: CourseResourceEventType.AddSectionResources,
      sectionId: 'section-1',
      resources: [{ id: 'resource-1', name: 'Resource 1' }]
    })

    await waitFor(() => {
      expect(mockedResourceEventHandler).toHaveBeenCalledWith({
        type: CourseResourceEventType.AddSectionResources,
        sectionId: 'section-1',
        resources: [{ id: 'resource-1', name: 'Resource 1' }]
      })
    })
  })
})

describe('CooperationActivitiesList without section data', () => {
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

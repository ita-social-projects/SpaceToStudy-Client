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

const TestsId = {
  addButton: 'Add activity',
  activityContainer: 'addActivity-container',
  closeIcon: 'CloseIcon'
}

const renderWithMockData = (
  sections = [],
  courseData = mockedCourseData,
  isNewActivity = true
) => {
  renderWithProviders(<CooperationActivitiesList />, {
    preloadedState: {
      cooperations: {
        selectedCourse: courseData,
        isNewActivity: isNewActivity,
        sections: sections
      }
    }
  })
}

const mockDispatch = vi.fn()
vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

vi.mock('~/containers/course-sections-list/CourseSectionsList', async () => {
  const CourseSectionsList = (
    await vi.importActual(
      '~/containers/course-sections-list/CourseSectionsList'
    )
  ).default
  return {
    __esModule: true,
    default: (props) => (
      <>
        <CourseSectionsList
          /* eslint-disable react/jsx-handler-names */
          handleSectionInputChange={props.handleSectionChange}
          isCooperation
          items={props.items}
          resourceEventHandler={props.resourceEventHandler}
          sectionEventHandler={props.sectionEventHandler}
          titleText='moduleTitle'
        />
        <input
          data-testid='mock-CourseSectionsList'
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
})

describe('CooperationActivitiesList with section data', () => {
  beforeEach(() => {
    renderWithMockData(mockedSectionsData)
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

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/addNewCooperationSection',
        payload: {
          index: 0
        }
      })
    })
  })

  it('should delete section resource', async () => {
    await waitFor(() => {
      const deleteResourceBtn = screen.getAllByTestId(TestsId.closeIcon)[0]
      fireEvent.click(deleteResourceBtn)
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/deleteResource',
        payload: {
          resourceId: mockedSectionsData[0].resources[0].resource.id,
          sectionId: mockedSectionsData[0].id
        }
      })
    })
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
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionAdded,
            index: 0
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/addNewCooperationSection',
        payload: {
          index: 0
        }
      })
    })
  })

  it('should call sectionEventHandler with SectionRemoved event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionRemoved,
            sectionId: 'section-1'
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/deleteCooperationSection',
        payload: 'section-1'
      })
    })
  })

  it('should call sectionEventHandler with SectionsOrderChange event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionsOrderChange,
            sections: [
              { id: 'section-2', name: 'Section 2' },
              { id: 'section-1', name: 'Section 1' }
            ]
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/setCooperationSections',
        payload: [
          { id: 'section-2', name: 'Section 2' },
          { id: 'section-1', name: 'Section 1' }
        ]
      })
    })
  })

  it('should call resourceEventHandler with ResourceUpdated event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.ResourceUpdated,
            sectionId: 'section-1',
            resourceId: 'resource-1',
            resource: { name: 'Updated Resource' }
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/updateResource',
        payload: {
          sectionId: 'section-1',
          resourceId: 'resource-1',
          resource: { name: 'Updated Resource' }
        }
      })
    })
  })

  it('should call resourceEventHandler with ResourcesOrderChange event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.ResourcesOrderChange,
            sectionId: 'section-1',
            resources: [{ id: 'resource-1', name: 'Resource 1' }]
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/updateResourcesOrder',
        payload: {
          sectionId: 'section-1',
          resources: [{ id: 'resource-1', name: 'Resource 1' }]
        }
      })
    })
  })

  it('should call resourceEventHandler with AddSectionResources event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.AddSectionResources,
            sectionId: 'section-1',
            resources: [{ id: 'resource-1', name: 'Resource 1' }]
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'cooperationsSlice/addSectionResources',
        payload: {
          sectionId: 'section-1',
          resources: [{ id: 'resource-1', name: 'Resource 1' }]
        }
      })
    })
  })

  it('should call handleSectionInputChange event', async () => {
    const courseSectionList = screen.getByTestId('mock-CourseSectionsList')

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'handleSectionInputChange',
          payload: {
            id: 'id',
            field: 'field',
            value: 'value'
          }
        })
      }
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled(1)
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
    renderWithMockData(mockedEmptySectionsData, mockedCourseData, true, true)

    const sections = await screen.findAllByTestId(TestsId.addButton)
    expect(sections.length).toBe(1)
  })

  it('should add a new section when no section was added and no course was selected', async () => {
    renderWithMockData(
      mockedEmptySectionsData,
      { ...mockedCourseData, sections: [] },
      false,
      true
    )

    const sections = await screen.findAllByTestId(TestsId.addButton)
    expect(sections.length).toBe(1)
  })
})

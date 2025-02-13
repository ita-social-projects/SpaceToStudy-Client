import { screen, fireEvent, act } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'

import reducer from '~/redux/reducer'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer, { openAlert } from '~/redux/features/snackbarSlice'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { snackbarVariants } from '~/constants'
import { URLs } from '~/constants/request'
import {
  UserRoleEnum,
  CourseResourceEventType,
  CourseSectionEventType
} from '~/types'
import {
  mockCourseResponseData,
  mockNewCourseData,
  mockUpdatedCourseData,
  mockNewSectionResource,
  mockUpdatedSectionResource,
  mockCategoriesNames,
  mockSubjectsNames
} from '~tests/unit/pages/create-course/CreateCourse.spec.constants'

import CreateCourse from '~/pages/create-course/CreateCourse'

const mockState = {
  appMain: {
    userId: mockCourseResponseData.author,
    userRole: UserRoleEnum.Tutor
  }
}

const store = configureStore({
  reducer: {
    appMain: reducer,
    snackbar: snackbarReducer,
    cooperations: cooperationsReducer
  },
  preloadedState: mockState
})

const mockNavigate = vi.fn()
const mockUseParams = vi.fn()
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useParams: () => mockUseParams()
}))

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

const mockDispatch = vi.fn()
vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch
  }
})

const mockFetchCourseData = vi.fn().mockResolvedValue(mockCourseResponseData)
vi.mock('~/hooks/use-axios', async () => {
  const actual = await vi.importActual('~/hooks/use-axios')
  return {
    ...actual,
    useAxios: vi.fn(() => ({
      loading: false,
      response: null,
      fetchData: mockFetchCourseData
    }))
  }
})

const mockHandleInputChange = vi.fn()
const mockHandleNonInputValueChange = vi.fn()
const mockHandleBlur = vi.fn()
const mockHandleSubmit = vi.fn().mockResolvedValue(mockUpdatedCourseData)
let mockInitialFormData = {
  title: '',
  description: '',
  author: { _id: '' },
  category: null,
  subject: null,
  proficiencyLevel: [],
  sections: []
}
let mockOnSubmit
const updateFormData = (data) => {
  mockInitialFormData = { ...mockInitialFormData, ...data }
}
const mockUseForm = vi.hoisted(() => {
  return vi.fn(({ onSubmit } = {}) => {
    mockOnSubmit = () => act(() => onSubmit())
    return {
      handleSubmit: mockHandleSubmit,
      handleInputChange: mockHandleInputChange,
      handleNonInputValueChange: mockHandleNonInputValueChange,
      handleBlur: mockHandleBlur,
      data: mockInitialFormData,
      errors: {
        category: 'Please select a category',
        subject: 'Please select a subject'
      }
    }
  })
})
vi.mock('~/hooks/use-form', async () => ({
  default: mockUseForm
}))

vi.mock('~/containers/course-sections-list/CourseSectionsList', () => ({
  __esModule: true,
  default: (props) => (
    <input
      data-testid='mock-CourseSectionsList'
      onChange={(e) => {
        const parsed = JSON.parse(e.target.value)
        props[parsed.event](parsed.payload)
      }}
    />
  )
}))

describe('CreateCourse with params id', () => {
  beforeEach(() => {
    mockUseParams.mockReset()
    mockUseParams.mockReturnValue({ id: mockCourseResponseData._id })

    mockAxiosClient
      .onGet(`${URLs.courses.get}/${mockCourseResponseData._id}`)
      .reply(200, () => {
        updateFormData(mockCourseResponseData)
        return mockCourseResponseData
      })

    mockAxiosClient
      .onPost(URLs.courses.create, mockNewCourseData)
      .reply(200, () => {
        updateFormData(mockNewCourseData)
        return mockNewCourseData
      })

    mockAxiosClient
      .onPatch(
        `${URLs.courses.patch}/${mockCourseResponseData._id}`,
        mockUpdatedCourseData
      )
      .reply(200, () => {
        updateFormData(mockUpdatedCourseData)
        return mockUpdatedCourseData
      })

    mockAxiosClient
      .onDelete(`${URLs.courses.delete}/${mockCourseResponseData._id}`)
      .reply(200, null)

    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, mockCategoriesNames)

    mockAxiosClient
      .onGet(`${URLs.categories.get}/1${URLs.subjects.getNames}`)
      .reply(200, mockSubjectsNames)

    renderWithProviders(<CreateCourse />, { store })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReset()
    mockNavigate.mockReset()
    mockDispatch.mockReset()
  })

  it('should render "Cancel", "Save" and "Add Section" buttons', async () => {
    const cancelButton = await screen.findByText('common.cancel')
    const saveButton = await screen.findByText('common.save')
    const addSectionButton = await screen.findByText('course.addSectionBtn')

    expect(cancelButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
    expect(addSectionButton).toBeInTheDocument()
  })

  it('should choose the category from options list', async () => {
    const [autocomplete] = await screen.findAllByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.change(autocomplete, {
      target: { value: mockCategoriesNames[1].name }
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(mockCategoriesNames[1].name)

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(mockCategoriesNames[1].name)
  })

  it('should choose the subject from options list', async () => {
    const [autocomplete] = await screen.findAllByRole('combobox')

    expect(autocomplete).toBeInTheDocument()

    fireEvent.click(autocomplete)
    fireEvent.focus(autocomplete)

    fireEvent.change(autocomplete, {
      target: { value: mockSubjectsNames[1].name }
    })

    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(mockSubjectsNames[1].name)
  })

  it('should display error for category', async () => {
    const [categoryAutocomplete] = await screen.findAllByRole('combobox')

    fireEvent.click(categoryAutocomplete)
    fireEvent.blur(categoryAutocomplete)

    const saveButton = screen.getByText('common.save')
    fireEvent.click(saveButton)

    const errorMessage = screen.getByText('Please select a category')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should display error for subject', async () => {
    const subjectAutocomplete = await screen.findAllByRole('combobox')

    fireEvent.click(subjectAutocomplete[1])
    fireEvent.blur(subjectAutocomplete[1])

    const errorMessage = screen.getByText('Please select a subject')

    expect(errorMessage).toBeInTheDocument()
  })

  it('should render the proficiency levels in option list', async () => {
    const select = await screen.findByLabelText(/level/i)
    expect(select).toBeInTheDocument()

    const proficiencyCheckbox = screen.getByDisplayValue(
      /beginner,intermediate/i
    )
    expect(proficiencyCheckbox).toBeInTheDocument()
  })

  it('should add a new section when the "Add Section" button is clicked', async () => {
    const addSectionButton = await screen.findByText('course.addSectionBtn')
    fireEvent.click(addSectionButton)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'sections',
      expect.arrayContaining([
        expect.objectContaining({
          title: '',
          description: '',
          id: expect.any(String),
          resources: []
        })
      ])
    )
  })

  it('should call handleInputChange when "Course title" input is changed', async () => {
    const inputField = await screen.findByDisplayValue(
      mockCourseResponseData.title
    )
    expect(inputField).toBeInTheDocument()

    fireEvent.change(inputField, { target: { value: 'New course title' } })
    fireEvent.blur(inputField)

    expect(mockHandleInputChange).toHaveBeenCalledWith('title')
  })

  it('should call handleInputChange when "Course description" input is changed', async () => {
    const inputField = await screen.findByText(
      mockCourseResponseData.description
    )
    expect(inputField).toBeInTheDocument()

    fireEvent.change(inputField, {
      target: { value: 'New course description' }
    })
    fireEvent.blur(inputField)

    expect(mockHandleInputChange).toHaveBeenCalledWith('description')
  })

  it('should update course with mockUpdatedCourseData and submit', async () => {
    updateFormData(mockUpdatedCourseData)

    const saveButton = await screen.findByText('common.save')
    fireEvent.click(saveButton)
    await mockOnSubmit()

    expect(mockAxiosClient.history.patch.length).toBe(1)
    expect(mockAxiosClient.history.patch[0].url).toBe(
      `${URLs.courses.patch}/${mockCourseResponseData._id}`
    )

    const textAreas = screen.getAllByRole('textbox')
    expect(textAreas[0].value).toBe(mockUpdatedCourseData.title)
    expect(textAreas[1].value).toBe(mockUpdatedCourseData.description)

    expect(mockDispatch).toHaveBeenCalledWith(
      openAlert({
        severity: snackbarVariants.success,
        message: 'myCoursesPage.newCourse.successEditedCourse'
      })
    )
  })
})

describe('CreateCourse without params id', () => {
  beforeEach(() => {
    mockUseParams.mockReset()
    mockUseParams.mockReturnValue({ id: null })

    renderWithProviders(<CreateCourse />, { store })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReset()
    mockNavigate.mockReset()
    mockDispatch.mockReset()
  })

  it('should handle saving a new course when id is null', async () => {
    updateFormData(mockNewCourseData)

    const saveButton = await screen.findByText('common.save')
    fireEvent.click(saveButton)
    await mockOnSubmit()

    expect(mockAxiosClient.history.post.length).toBe(1)
    expect(mockAxiosClient.history.post[0].url).toBe(URLs.courses.create)

    const textAreas = screen.getAllByRole('textbox')
    expect(textAreas[0].value).toBe(mockNewCourseData.title)
    expect(textAreas[1].value).toBe(mockNewCourseData.description)

    expect(mockDispatch).toHaveBeenCalledWith(
      openAlert({
        severity: snackbarVariants.success,
        message: 'myCoursesPage.newCourse.successCreatedCourse'
      })
    )
  })
})

describe('Testing CreateCourse Event Handlers', () => {
  const mockSectionId = mockNewCourseData.sections[0].id
  beforeEach(() => {
    mockUseParams.mockReset()
    mockUseParams.mockReturnValue({ id: mockNewCourseData._id })

    renderWithProviders(<CreateCourse />, { store })
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockUseParams.mockReset()
    mockNavigate.mockReset()
    mockDispatch.mockReset()
  })

  it('should handle adding a new resource to a section [CourseResourceEventType.AddSectionResources] when isDuplicate=false', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.AddSectionResources,
            sectionId: mockSectionId,
            resources: [mockNewSectionResource],
            isDuplicate: false
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith('sections', [
      {
        _id: mockNewCourseData.sections[0]._id,
        id: mockSectionId,
        description: mockNewCourseData.sections[0].description,
        resources: [
          ...mockNewCourseData.sections[0].resources,
          {
            resource: { ...mockNewSectionResource, id: expect.any(String) },
            resourceType: mockNewSectionResource.resourceType
          }
        ],
        title: mockNewCourseData.sections[0].title
      }
    ])
  })

  it('should handle adding a new resource to a section [CourseResourceEventType.AddSectionResources] when isDuplicate=true', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.AddSectionResources,
            sectionId: mockSectionId,
            resources: [mockNewSectionResource],
            isDuplicate: true
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith('sections', [
      expect.objectContaining({
        id: mockCourseResponseData.sections[0].id,
        title: mockCourseResponseData.sections[0].title,
        resources: expect.arrayContaining([
          expect.objectContaining({
            resource: expect.objectContaining({
              _id: mockCourseResponseData.sections[0].resources[0].resource._id,
              title:
                mockCourseResponseData.sections[0].resources[0].resource.title
            }),
            resourceType:
              mockCourseResponseData.sections[0].resources[0].resourceType
          }),
          expect.objectContaining({
            resource: expect.objectContaining({
              _id: expect.any(String),
              title: mockNewSectionResource.title,
              isDuplicate: true
            }),
            resourceType: mockNewSectionResource.resourceType
          })
        ])
      })
    ])
  })

  it('should handle resource update event [CourseResourceEventType.ResourceUpdated]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.ResourceUpdated,
            sectionId: mockSectionId,
            resourceId: mockUpdatedSectionResource.id,
            resource: mockUpdatedSectionResource
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })

  it('should handle resource order change even [CourseResourceEventType.ResourcesOrderChange]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.ResourcesOrderChange,
            sectionId: mockSectionId,
            resources: [mockUpdatedSectionResource]
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })

  it('should handle resource removal event [CourseResourceEventType.ResourceRemoved]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'resourceEventHandler',
          payload: {
            type: CourseResourceEventType.ResourceRemoved,
            sectionId: mockSectionId,
            resourceId: mockUpdatedSectionResource._id
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })

  it('should handle section addition event [CourseSectionEventType.SectionAdded]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionAdded
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })

  it('should handle section order change event [CourseSectionEventType.SectionsOrderChange]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionsOrderChange,
            sections: [
              { id: 'section-1', title: 'Section 1' },
              { id: 'section-2', title: 'Section 2' },
              { id: 'section-3', title: 'Section 3' }
            ]
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })

  it('should handle section removal event [CourseSectionEventType.SectionRemoved]', async () => {
    const courseSectionList = await screen.findByTestId(
      'mock-CourseSectionsList'
    )

    fireEvent.change(courseSectionList, {
      target: {
        value: JSON.stringify({
          event: 'sectionEventHandler',
          payload: {
            type: CourseSectionEventType.SectionRemoved,
            sectionId: mockSectionId
          }
        })
      }
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalled(1)
  })
})

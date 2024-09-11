import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { mockAxiosClient, selectOption } from '~tests/test-utils'
import CourseToolbar from '~/containers/my-courses/course-toolbar/CourseToolbar'
import { URLs } from '~/constants/request'
import { ProficiencyLevelEnum } from '~/types'
import { proficiencyLevelLabels } from '~/constants/labels'
import { act } from 'react-dom/test-utils'

const mockData = {
  title: '',
  description: '',
  author: {
    _id: ''
  },
  category: null,
  subject: null,
  proficiencyLevel: [],
  sections: [
    {
      id: '1716926626910',
      title: '',
      description: '',
      resources: [],
      order: []
    }
  ]
}

const mockUser = {
  _id: '662768547f34477f340404f1',
  role: ['tutor'],
  firstName: 'Максим',
  lastName: 'Гевик',
  email: 'testemail@gmail.com',
  mainSubjects: {
    student: []
  },
  totalReviews: {
    student: 0,
    tutor: 0
  },
  averageRating: {
    student: 0,
    tutor: 0
  },
  nativeLanguage: null,
  isEmailConfirmed: true,
  isFirstLogin: false,
  lastLogin: '2024-05-27T12:18:57.707Z',
  status: {
    student: 'active',
    tutor: 'active',
    admin: 'active'
  },
  lastLoginAs: 'tutor',
  bookmarkedOffers: [],
  createdAt: '2024-04-23T07:50:44.735Z',
  updatedAt: '2024-05-28T12:59:45.004Z',
  professionalBlock: {
    education: '',
    workExperience: '',
    scientificActivities: '',
    awards: ''
  }
}

const mockErrors = {
  title: '',
  description: '',
  author: '',
  category: '',
  subject: '',
  proficiencyLevel: '',
  sections: ''
}

const mockCategories = [
  { _id: '1', name: 'category1' },
  { _id: '2', name: 'category2' }
]

const mockSubjects = [{ _id: '1', name: 'Algebra' }]

const mockHandleBlur = vi.fn()
const mockHandleInputChange = vi.fn()
const mockHandleNonInputValueChange = vi.fn()

const getCourseToolbarElement = ({
  data = mockData,
  user = mockUser,
  errors = mockErrors
} = {}) => {
  return (
    <CourseToolbar
      data={data}
      errors={errors}
      handleBlur={mockHandleBlur}
      handleInputChange={mockHandleInputChange}
      handleNonInputValueChange={mockHandleNonInputValueChange}
      user={user}
    />
  )
}

const checkErrorMessage = (errorFieldKey, errorMessage) => {
  const { rerender } = render(getCourseToolbarElement())

  expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()

  rerender(
    getCourseToolbarElement({
      errors: { ...mockErrors, [errorFieldKey]: errorMessage }
    })
  )

  expect(screen.getByText(errorMessage)).toBeInTheDocument()
}

const checkInputValueChange = (fieldKey, name) => {
  const { rerender } = render(getCourseToolbarElement())

  const value = 'test'
  const titleTextarea = screen.getByRole('textbox', { name })

  expect(titleTextarea).toHaveValue('')

  rerender(
    getCourseToolbarElement({ data: { ...mockData, [fieldKey]: value } })
  )

  expect(titleTextarea).toHaveValue(value)
}

describe('CourseToolbar', () => {
  beforeAll(() => {
    mockAxiosClient.onGet(URLs.categories.getNames).reply(200, mockCategories)
    mockAxiosClient
      .onGet(`${URLs.categories.get}/1${URLs.subjects.getNames}`)
      .reply(200, mockSubjects)
  })

  describe('with single render', () => {
    beforeEach(async () => {
      await waitFor(() => {
        render(getCourseToolbarElement())
      })
    })

    it('should render correctly', () => {
      const categoryDropdown = screen.getByText('breadCrumbs.category')
      expect(categoryDropdown).toBeInTheDocument()
    })

    it('should update value of category autocomplete correctly', async () => {
      const autocomplete = screen.getByLabelText(/category/i)
      await selectOption(autocomplete, mockCategories[0].name)

      expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
        'category',
        mockCategories[0]._id
      )
      expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
        'subject',
        null
      )
    })

    it('should update value of level select correctly', () => {
      const select = screen.getByLabelText(/level/i)

      waitFor(() => {
        fireEvent.mouseDown(select)
      })

      const proficiencyCheckbox = screen.getByText(
        proficiencyLevelLabels.get(ProficiencyLevelEnum.Beginner)
      )
      fireEvent.click(proficiencyCheckbox)

      expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
        'proficiencyLevel',
        [ProficiencyLevelEnum.Beginner]
      )
    })
  })

  describe('with rerenders', () => {
    it('should update value of subject dropdown correctly', async () => {
      const { rerender } = render(getCourseToolbarElement())

      const categoryAutocomplete = screen.getByLabelText(/category/i)
      await selectOption(categoryAutocomplete, mockCategories[0].name)

      // component should change because of rerender from parent component's useForm
      rerender(
        getCourseToolbarElement({ data: { ...mockData, category: '1' } })
      )

      const subjectAutocomplete = screen.getByLabelText(/subject/i)
      await selectOption(subjectAutocomplete, mockSubjects[0].name)
    })

    it('should output error message if category is not selected', () => {
      checkErrorMessage('category', 'common.errorMessages.category')
    })

    it('should output error message if subject is not selected', () => {
      checkErrorMessage('subject', 'common.errorMessages.subject')
    })

    it('should change title input value correctly', () => {
      checkInputValueChange('title', 'lesson.labels.title')
    })

    it('should change description input value correctly', () => {
      checkInputValueChange('description', 'lesson.labels.description')
    })
  })
})

import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'

import { useAppSelector } from '~/hooks/use-redux'
import { ProficiencyLevelEnum, UserRoleEnum } from '~/types'

import SpecializationBlock from '~/containers/offer-page/specialization-block/SpecializationBlock'

const mockHandleBlur = vi.fn()
const mockHandleNonInputValueChange = vi.fn()

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: vi.fn()
}))

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategoriesNames: vi.fn()
  }
}))

vi.mock('~/services/subject-service', () => ({
  subjectService: {
    getSubjectsNames: vi.fn()
  }
}))

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  __esModule: true,
  default: ({ onChange, ...props }) => (
    <input
      aria-describedby={
        props.textFieldProps?.error ? 'error-text' : 'helper-text'
      }
      aria-invalid={props.textFieldProps?.error ? 'true' : 'false'}
      aria-label={props.textFieldProps?.label}
      onChange={(e) => {
        onChange(e, JSON.parse(e.target.value))
      }}
      required={props.textFieldProps?.required}
    />
  )
}))

vi.mock('~/components/checkbox-list/CheckboxList', () => ({
  __esModule: true,
  default: ({ onChange, value, items }) => (
    <div>
      {items.map((item) => (
        <label key={item}>
          <input
            aria-label={`${item}`}
            checked={value.includes(item)}
            onChange={() => onChange(item)}
            type='checkbox'
          />
          {item}
        </label>
      ))}
    </div>
  )
}))

describe('Test SpecializationBlock container - [ user role: tutor & with errors in fields ]', () => {
  const mockData = {
    category: 'data category',
    subject: '',
    proficiencyLevel: []
  }

  const mockErrors = {
    category: 'some error message',
    subject: 'some error message',
    proficiencyLevel: ''
  }

  beforeEach(() => {
    useAppSelector.mockReturnValue({ userRole: UserRoleEnum.Tutor })

    renderWithProviders(
      <SpecializationBlock
        data={mockData}
        errors={mockErrors}
        handleBlur={mockHandleBlur}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should correctly render offer page labels based on tutor user role', () => {
    expect(
      screen.getByText(/offerPage.title.firstStep.tutor/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/offerPage.description.category.tutor/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/offerPage.description.level.tutor/i)
    ).toBeInTheDocument()
  })

  it('should handle category change correctly', () => {
    const selectedCategory = { _id: 'mockedId', name: 'Selected Category' }
    const categoryAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.category/i
    )
    expect(categoryAsyncAutocomplete).toBeInTheDocument()
    fireEvent.change(categoryAsyncAutocomplete, {
      target: { value: JSON.stringify(selectedCategory) }
    })
    fireEvent.blur(categoryAsyncAutocomplete)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'category',
      selectedCategory._id
    )
    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith('subject', '')
    expect(mockHandleNonInputValueChange).toHaveBeenCalledTimes(2)
  })

  it('should handle category change with null id correctly', () => {
    const selectedCategory = { _id: null, name: 'Selected Category without ID' }
    const categoryAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.category/i
    )
    expect(categoryAsyncAutocomplete).toBeInTheDocument()
    fireEvent.change(categoryAsyncAutocomplete, {
      target: { value: JSON.stringify(selectedCategory) }
    })
    fireEvent.blur(categoryAsyncAutocomplete)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith('category', '')
    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith('subject', '')
    expect(mockHandleNonInputValueChange).toHaveBeenCalledTimes(2)
  })

  it('should handle subject change correctly', async () => {
    const selectedSubject = { _id: 'mockedID', name: 'Selected Subject' }
    const subjectAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.subject/i
    )
    expect(subjectAsyncAutocomplete).toBeInTheDocument()
    fireEvent.change(subjectAsyncAutocomplete, {
      target: { value: JSON.stringify(selectedSubject) }
    })
    fireEvent.blur(subjectAsyncAutocomplete)

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'subject',
      selectedSubject._id
    )
    expect(mockHandleNonInputValueChange).toHaveBeenCalledTimes(1)
  })

  it('should handle proficiency level change correctly', () => {
    const beginnerCheckbox = screen.getByLabelText('Beginner')
    const advancedCheckbox = screen.getByLabelText('Advanced')
    waitFor(() => {
      fireEvent.click(beginnerCheckbox)
      fireEvent.click(advancedCheckbox)
      fireEvent.change(beginnerCheckbox, { target: { checked: true } })
      fireEvent.change(advancedCheckbox, { target: { checked: true } })
    })

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'proficiencyLevel',
      ProficiencyLevelEnum.Beginner
    )
    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'proficiencyLevel',
      ProficiencyLevelEnum.Advanced
    )
    expect(beginnerCheckbox.checked).toBe(true)
    expect(advancedCheckbox.checked).toBe(true)
  })

  it('should check textFieldProps for category AsyncAutocomplete', () => {
    const categoryAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.category/i
    )
    expect(categoryAsyncAutocomplete).toBeInTheDocument()
    expect(categoryAsyncAutocomplete).toHaveAttribute('required')
    expect(categoryAsyncAutocomplete).toHaveAttribute('aria-invalid', 'true')
    expect(categoryAsyncAutocomplete).toHaveAttribute(
      'aria-describedby',
      'error-text'
    )
  })

  it('should check textFieldProps for subject AsyncAutocomplete', () => {
    const subjectAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.subject/i
    )
    expect(subjectAsyncAutocomplete).toBeInTheDocument()
    expect(subjectAsyncAutocomplete).toHaveAttribute('required')
    expect(subjectAsyncAutocomplete).toHaveAttribute('aria-invalid', 'true')
    expect(subjectAsyncAutocomplete).toHaveAttribute(
      'aria-describedby',
      'error-text'
    )
  })
})

describe('Test SpecializationBlock container - [ user role: student & without errors in fields ]', () => {
  const mockData = {
    category: 'data category',
    subject: '',
    proficiencyLevel: []
  }

  const mockErrors = {
    category: '',
    subject: '',
    proficiencyLevel: ''
  }

  beforeEach(() => {
    useAppSelector.mockReturnValue({ userRole: UserRoleEnum.Student })

    renderWithProviders(
      <SpecializationBlock
        data={mockData}
        errors={mockErrors}
        handleBlur={mockHandleBlur}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should correctly render offer page labels based on student user role', () => {
    expect(
      screen.getByText(/offerPage.title.firstStep.student/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/offerPage.description.category.student/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/offerPage.description.level.student/i)
    ).toBeInTheDocument()
  })

  it('should check textFieldProps for category AsyncAutocomplete', () => {
    const categoryAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.category/i
    )
    expect(categoryAsyncAutocomplete).toBeInTheDocument()
    expect(categoryAsyncAutocomplete).toHaveAttribute('required')
    expect(categoryAsyncAutocomplete).toHaveAttribute('aria-invalid', 'false')
    expect(categoryAsyncAutocomplete).toHaveAttribute(
      'aria-describedby',
      'helper-text'
    )
  })

  it('should check textFieldProps for subject AsyncAutocomplete', () => {
    const subjectAsyncAutocomplete = screen.getByLabelText(
      /offerPage.labels.subject/i
    )
    expect(subjectAsyncAutocomplete).toBeInTheDocument()
    expect(subjectAsyncAutocomplete).toHaveAttribute('required')
    expect(subjectAsyncAutocomplete).toHaveAttribute('aria-invalid', 'false')
    expect(subjectAsyncAutocomplete).toHaveAttribute(
      'aria-describedby',
      'helper-text'
    )
  })
})

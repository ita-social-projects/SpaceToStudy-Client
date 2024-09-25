import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import {
  mockedLessonDataOriginal,
  mockedQuizDataDuplicate,
  mockedAttachmentDataOriginal,
  mockAvailabilityForLesson,
  mockAvailabilityForQuizDataDuplicate,
  mockAvailabilityOpen
} from '~tests/unit/containers/course-section/resource-item/ResourceItem.spec.constants'

import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'

const mockDeleteResource = vi.fn()
const mockEditResource = vi.fn()
const mockUpdateAvailability = vi.fn()

vi.mock('@mui/x-date-pickers/LocalizationProvider', async () => {
  const actual = await vi.importActual(
    '@mui/x-date-pickers/LocalizationProvider'
  )
  return {
    ...actual,
    LocalizationProvider: ({ children }) => (
      <div data-testid='mock-LocalizationProvider'>{children}</div>
    )
  }
})

vi.mock('@mui/x-date-pickers/DatePicker', () => ({
  __esModule: true,
  DatePicker: ({ onChange }) => (
    <input
      data-testid='mock-DatePicker'
      onChange={(e) => {
        const newDate = new Date(e.target.value)
        onChange(newDate)
      }}
      type='date'
    />
  )
}))

describe('ResourceItem tests', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityForLesson}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        isCooperation
        resource={mockedLessonDataOriginal}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })

  it('should render added resource', () => {
    const resourceTitle = screen.getByText(mockedLessonDataOriginal.title)
    const resourceDescription = screen.getByText(
      mockedLessonDataOriginal.description
    )

    expect(resourceTitle).toBeInTheDocument()
    expect(resourceDescription).toBeInTheDocument()
  })

  it('should display lesson icon', () => {
    const lessonIcon = screen.getByTestId('ListAltIcon')
    expect(lessonIcon).toBeInTheDocument()
  })

  it('should call delete resource function', () => {
    const deleteButton = screen.getByLabelText('delete')

    fireEvent.click(deleteButton)

    expect(mockDeleteResource).toHaveBeenCalledTimes(1)
  })

  it('should call link resource function', () => {
    const linkButton = screen.getByLabelText('link')
    const iconLink = screen.getByTestId('LinkRoundedIcon')

    fireEvent.click(linkButton)

    expect(iconLink).toBeInTheDocument()
    expect(mockEditResource).toHaveBeenCalledTimes(1)
  })

  it('should set resourceAvailabilityStatus to Open when resourceAvailability is null or undefined', () => {
    const availabilityIcon = screen.getByRole('img', {
      src: '/src/assets/img/cooperation-details/resource-availability/open-icon.svg'
    })
    expect(availabilityIcon).toBeInTheDocument()
  })
})

describe('ResourceItem tests with isView prop', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        isView
        resource={mockedLessonDataOriginal}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })

  it('should render availability icon', () => {
    const availabilityIcon = screen.getByRole('img', {
      name: /resource icon/i
    })
    expect(availabilityIcon).toBeInTheDocument()
  })

  it('should not render link and delete icon', () => {
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('link')).not.toBeInTheDocument()
  })

  it('should properly render availability status and icon', () => {
    const option = screen.getByRole('img', {
      src: '/src/assets/img/cooperation-details/resource-availability/open-icon.svg'
    })

    expect(option).toBeInTheDocument()
  })
})

describe('ResourceItem tests with isCooperation prop', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityForQuizDataDuplicate}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        isCooperation
        resource={mockedQuizDataDuplicate}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })

  it('should render availability selection', () => {
    const availabilitySelection = screen.getByTestId('ArrowDropDownIcon')
    expect(availabilitySelection).toBeInTheDocument()
  })

  it('should properly render availability status and icon', () => {
    const availabilitySelect = screen.getByTestId('app-select')
    const option = screen.getByRole('img', {
      src: '/src/assets/img/cooperation-details/resource-availability/open-from.svg'
    })

    expect(availabilitySelect).toBeInTheDocument()
    expect(option).toBeInTheDocument()
    expect(availabilitySelect.value).toBe('openFrom')
  })

  it('should call setOpenFromDate when DatePicker value changes', async () => {
    const datePickerInput = screen.getByTestId('mock-DatePicker')
    fireEvent.change(datePickerInput, { target: { value: '2025-08-16' } })

    await waitFor(() => {
      expect(mockUpdateAvailability).toHaveBeenCalledWith(
        mockedQuizDataDuplicate,
        expect.objectContaining({
          status: 'openFrom',
          date: '2025-08-16T00:00:00.000Z'
        })
      )
    })
  })

  it('should call updateAvailability when availability status changes', () => {
    const availabilitySelect = screen.getByTestId('app-select')
    fireEvent.change(availabilitySelect, { target: { value: 'open' } })

    expect(mockUpdateAvailability).toHaveBeenCalledWith(
      mockedQuizDataDuplicate,
      expect.objectContaining({
        status: 'open',
        date: null
      })
    )
  })
})

describe('ResourceItem tests when isDuplicate=true and resourceType quiz', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        resource={mockedQuizDataDuplicate}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })

  it('should display quiz icon', () => {
    const quizIcon = screen.getByTestId('NoteAltOutlinedIcon')

    expect(quizIcon).toBeInTheDocument()
  })

  it('should call edit resource function', () => {
    const editButton = screen.getByLabelText('edit')

    fireEvent.click(editButton)

    expect(mockEditResource).toHaveBeenCalledTimes(2)
  })
})

describe('ResourceItem tests when resourceType attachment', () => {
  beforeEach(() => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        deleteResource={mockDeleteResource}
        editResource={mockEditResource}
        resource={mockedAttachmentDataOriginal}
        updateAvailability={mockUpdateAvailability}
      />
    )
  })

  it('should properly display attachment', () => {
    const attachmentItem = screen.getByText('png')

    expect(attachmentItem).toBeInTheDocument()
  })
})

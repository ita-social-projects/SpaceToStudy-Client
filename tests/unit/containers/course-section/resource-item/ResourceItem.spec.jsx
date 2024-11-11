import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import { ResourcesTypesEnum } from '~/types'

import {
  ResourceAvailabilityStatusEnum,
  ResourcesTypesEnum as ResourceType
} from '~/types'
import {
  mockedLessonDataOriginal,
  mockedQuizDataDuplicate,
  mockedAttachmentDataOriginal,
  mockedAttachmentDataDuplicate,
  mockAvailabilityForLesson,
  mockAvailabilityForQuizDataDuplicate,
  mockAvailabilityOpen,
  mockAvailabilityOpenFrom,
  mockAvailabilityClosed
} from '~tests/unit/containers/course-section/resource-item/ResourceItem.spec.constants'
import { ResourceService } from '~/services/resource-service'
import ResourceItem from '~/containers/course-section/resource-item/ResourceItem'
import { afterEach, expect, it, vi } from 'vitest'

const mockDeleteResource = vi.fn()
const mockEditResource = vi.fn()
const mockUpdateAvailability = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

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

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => navigateMock
}))

vi.mock('~/services/resource-service', () => ({
  ResourceService: {
    downloadAttachment: vi.fn()
  }
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

    expect(resourceTitle).toBeInTheDocument()
  })

  it('should display lesson icon', () => {
    const lessonIcon = screen.getByTestId('ArticleOutlinedIcon')
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

  it('should set resourceAvailabilityStatus to Closed when resourceAvailability is null or undefined', () => {
    const availabilityIcon = screen.getByTestId('CloseIcon')
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
    const availabilityIcon = screen.getByTestId(
      'CheckCircleOutlineOutlinedIcon'
    )
    expect(availabilityIcon).toBeInTheDocument()
  })

  it('should not render link and delete icon', () => {
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('link')).not.toBeInTheDocument()
  })

  it('should properly render availability status and icon', () => {
    const option = screen.getByTestId('CheckCircleOutlineOutlinedIcon')

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
    const option = screen.getByTestId('CloseIcon')

    expect(availabilitySelect).toBeInTheDocument()
    expect(option).toBeInTheDocument()
    expect(availabilitySelect.value).toBe('openFrom')
  })

  it('should call setOpenFromDate when DatePicker value changes', () => {
    const datePickerInput = screen.getByTestId('mock-DatePicker')
    fireEvent.change(datePickerInput, { target: { value: '2025-08-16' } })

    expect(mockUpdateAvailability).toHaveBeenCalledWith(
      mockedQuizDataDuplicate,
      expect.objectContaining({
        status: 'openFrom',
        date: '2025-08-16T00:00:00.000Z'
      })
    )
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
  let windowOpenMock

  beforeEach(() => {
    windowOpenMock = vi.spyOn(window, 'open').mockImplementation(() => {})
  })

  afterEach(() => {
    windowOpenMock.mockRestore()
  })

  it('should properly display attachment', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedAttachmentDataOriginal}
      />
    )

    const attachmentItem = screen.getByText(/png/)
    expect(attachmentItem).toBeInTheDocument()
  })

  it('should download attachment when clicked', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedAttachmentDataOriginal}
      />
    )

    const attachmentItem = screen.getByText(/png/)

    fireEvent.click(attachmentItem)
    expect(windowOpenMock).toHaveBeenCalledWith(
      '1723236050559-Exploring Systems of Linear Equations.png',
      '_blank'
    )
  })

  it('should download attachment when isDuplicate is true', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedAttachmentDataDuplicate}
      />
    )

    const attachmentItem = screen.getByText(/png/)

    fireEvent.click(attachmentItem)
    expect(windowOpenMock).toHaveBeenCalledWith(
      '1723236050559-Exploring Systems of Linear Equations.png',
      '_blank'
    )
  })

  it('should not download attachment when its availability is set to open from', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpenFrom}
        isView
        resource={mockedAttachmentDataDuplicate}
      />
    )

    const attachmentItem = screen.getByText(/png/)

    fireEvent.click(attachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalledWith()
  })

  it('should not download attachment when its availability is set to closed', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityClosed}
        isView
        resource={mockedAttachmentDataDuplicate}
      />
    )

    const attachmentItem = screen.getByText(/png/)

    fireEvent.click(attachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalledWith()
  })

  it('should not download anything if resource.resourceType is not Attachment', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedLessonDataOriginal}
      />
    )
    const nonAttachmentItem = screen.getByText(mockedLessonDataOriginal.title)

    fireEvent.click(nonAttachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalled()
  })

  it('should not download anything if resource.resourceType is not Attachment but resourceType IS an attachment', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedLessonDataOriginal}
        resourceType={ResourcesTypesEnum.Attachment}
      />
    )
    const nonAttachmentItem = screen.getByText(mockedLessonDataOriginal.title)

    fireEvent.click(nonAttachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalled()
  })

  it('should not download anything if resourceType is not Attachment but resource.resourceType IS an Attachment', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedAttachmentDataOriginal}
        resourceType={ResourcesTypesEnum.Quiz}
      />
    )

    const attachmentItem = screen.getByText(/png/)

    fireEvent.click(attachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalled()
  })

  it('should not download attachment if isView is false', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        resource={mockedAttachmentDataOriginal}
        resourceType={ResourcesTypesEnum.Attachment}
      />
    )

    const attachmentItem = screen.getByText(/png/)
    fireEvent.click(attachmentItem)
    expect(windowOpenMock).not.toHaveBeenCalled()
  })
})

describe('ResourceItem navigation', () => {
  afterEach(() => {
    mockNavigate.mockReset()
  })

  it('should navigate to lesson page when resourceType is Lesson', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedLessonDataOriginal}
      />
    )

    const lessonItem = screen.getByText(mockedLessonDataOriginal.title)
    fireEvent.click(lessonItem)

    expect(mockNavigate).toHaveBeenCalledWith(
      `lesson-details/${mockedLessonDataOriginal._id}`
    )
  })

  it('should navigate to quiz attempts page when resourceType is Quiz', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedQuizDataDuplicate}
      />
    )

    const quizItem = screen.getByText(mockedQuizDataDuplicate.title)
    fireEvent.click(quizItem)

    expect(mockNavigate).toHaveBeenCalledWith(
      `quizzes/${mockedQuizDataDuplicate._id}/attempts`
    )
  })

  it('should not call navigate if resource is an attachment', () => {
    renderWithProviders(
      <ResourceItem
        availability={mockAvailabilityOpen}
        isView
        resource={mockedAttachmentDataOriginal}
      />
    )

    const attachmentItem = screen.getByText(/png/)
    fireEvent.click(attachmentItem)

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})

describe('ResourceItem component', () => {
  const mockNavigate = vi.fn()
  const mockResource = {
    _id: '123',
    resourceType: ResourceType.Lesson
  }

  it('renders the button', () => {
    renderWithProviders(<ResourceItem resource={mockResource} />)
    expect(screen.getByTestId('resourceItem')).toBeInTheDocument()
  })

  it('does not navigate or download if isView is false', () => {
    renderWithProviders(<ResourceItem resource={mockResource} isView={false} />)

    fireEvent.click(screen.getByTestId('resourceItem'))
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(ResourceService.downloadAttachment).not.toHaveBeenCalled()
  })

  it('does not navigate or download if resource is not open', () => {
    renderWithProviders(
      <ResourceItem
        resource={mockResource}
        isView={true}
        availability={{ status: ResourceAvailabilityStatusEnum.Closed }}
      />
    )

    fireEvent.click(screen.getByTestId('resourceItem'))
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(ResourceService.downloadAttachment).not.toHaveBeenCalled()
  })

  it('navigates to lesson-details if resource type is Lesson and isView is true', () => {
    renderWithProviders(
      <ResourceItem
        resource={mockResource}
        resourceType={ResourceType.Lesson}
        isView={true}
        availability={{ status: ResourceAvailabilityStatusEnum.Open }}
      />
    )

    fireEvent.click(screen.getByTestId('resourceItem'))
    waitFor(()=> {
      expect(mockNavigate).toHaveBeenCalledWith('lesson-details/123')
    })
  })

  it('navigates to quiz if resource type is Quiz and isView is true', () => {
    renderWithProviders(
      <ResourceItem
        resource={{ ...mockResource, resourceType: ResourceType.Quiz }}
        resourceType={ResourceType.Quiz}
        isView={true}
        availability={{ status: ResourceAvailabilityStatusEnum.Open }}
      />
    )

    fireEvent.click(screen.getByTestId('resourceItem'))
    waitFor(()=> {
      expect(mockNavigate).toHaveBeenCalledWith('quiz/123')
    })
  })

  it('calls downloadAttachment if resource type is Attachment', () => {
    renderWithProviders(
      <ResourceItem
        resource={{
          ...mockResource,
          resourceType: ResourceType.Attachment,
          fileName: 'example.pdf'
        }}
        resourceType={ResourceType.Attachment}
        isView={true}
        availability={{ status: ResourceAvailabilityStatusEnum.Open }}
      />
    )

    fireEvent.click(screen.getByTestId('resourceItem'))
    expect(ResourceService.downloadAttachment).toHaveBeenCalledWith(
      '123',
      'example.pdf'
    )
  })
})

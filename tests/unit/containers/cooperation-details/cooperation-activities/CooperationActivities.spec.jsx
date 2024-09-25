import { screen, fireEvent, waitFor } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'

import { renderWithProviders } from '~tests/test-utils'
import reducer from '~/redux/reducer'
import cooperationsReducer from '~/redux/features/cooperationsSlice'
import snackbarReducer, { openAlert } from '~/redux/features/snackbarSlice'
import { setResourcesAvailability } from '~/redux/features/cooperationsSlice'
import { useAppSelector } from '~/hooks/use-redux'

import { snackbarVariants } from '~/constants'
import { ResourcesAvailabilityEnum } from '~/types'
import openIcon from '~/assets/img/cooperation-details/resource-availability/open-icon.svg'

import CooperationActivities from '~/containers/cooperation-details/cooperation-activities/CooperationActivities'

let mockUpdateCooperation
const mockSetEditMode = vi.fn()
const mockDispatch = vi.fn()

const mockedSections = [
  {
    resources: [
      {
        availability: {
          status: 'openFrom',
          date: null
        },
        resourceType: 'lesson'
      }
    ]
  }
]

const store = configureStore({
  reducer: {
    appMain: reducer,
    snackbar: snackbarReducer,
    cooperations: cooperationsReducer
  }
})

vi.mock('~/services/cooperation-service', async () => {
  const actual = await vi.importActual('~/services/cooperation-service')
  const mockUpdateCooperation = vi.fn()
  return {
    ...actual,
    cooperationService: {
      updateCooperation: mockUpdateCooperation
    }
  }
})

vi.mock('~/hooks/use-axios', async () => {
  const actual = await vi.importActual('~/hooks/use-axios')
  return {
    ...actual,
    useAxios: vi.fn(() => ({
      fetchData: vi.fn()
    }))
  }
})

vi.mock('~/redux/features/snackbarSlice', async () => {
  const actual = await vi.importActual('~/redux/features/snackbarSlice')
  return {
    ...actual,
    openAlert: vi.fn()
  }
})

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(() => ({
      sections: [],
      resourcesAvailability: ResourcesAvailabilityEnum.OpenAll
    }))
  }
})

vi.mock('~/components/app-select/AppSelect', () => ({
  __esModule: true,
  default: ({ setValue, ...props }) => (
    <input
      data-testid='mock-AppSelect'
      onChange={(e) => {
        setValue(JSON.parse(e.target.value))
      }}
      {...props}
    />
  )
}))

describe('CooperationActivities', () => {
  beforeEach(async () => {
    renderWithProviders(
      <CooperationActivities
        cooperationId='123'
        setEditMode={mockSetEditMode}
      />,
      { store }
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    mockDispatch.mockReset()
  })

  it('should render cooperation activities page', () => {
    expect(
      screen.getByText(
        /cooperationdetailspage\.publishcooperationdetailspage\.select\.openall/i
      )
    ).toBeInTheDocument()
  })

  it('should display "Save" and "Cancel" buttons', () => {
    expect(screen.getByText('common.save')).toBeInTheDocument()
    expect(screen.getByText('common.cancel')).toBeInTheDocument()
  })

  it('should display success message on successful update', async () => {
    const { cooperationService } = await import(
      '~/services/cooperation-service'
    )
    cooperationService.updateCooperation.mockResolvedValueOnce({})

    const saveButton = screen.getByText('common.save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.success,
        message: 'cooperationsPage.acceptModal.successMessage'
      })
    })

    it('should toggle edit mode on successful update', async () => {
      const { cooperationService } = await import(
        '~/services/cooperation-service'
      )
      cooperationService.updateCooperation.mockResolvedValueOnce({})

      const saveButton = screen.getByText('common.save')
      fireEvent.click(saveButton)

      await waitFor(() => {
        expect(mockUpdateCooperation).toHaveBeenCalledTimes(1)
        expect(mockUpdateCooperation).toHaveBeenCalledWith(expect.any(Function))
      })
    })
  })

  it('should display error message when updateCooperationSection fails with specific error', async () => {
    const { cooperationService } = await import(
      '~/services/cooperation-service'
    )

    const mockError = {
      response: {
        data: {
          message: 'An error occurred'
        }
      }
    }

    cooperationService.updateCooperation.mockRejectedValueOnce(mockError)

    const saveButton = screen.getByText('common.save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(1)
      expect(openAlert).toHaveBeenCalledTimes(1)
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.error,
        message: {
          text: 'errors.UNKNOWN_ERROR',
          options: {
            message: ''
          }
        }
      })
    })
  })

  it('should display open icon when resourcesAvailability is OpenAll', () => {
    const { getState } = store
    const initialResourcesAvailability =
      getState().cooperations.resourcesAvailability

    expect(initialResourcesAvailability).toBe(ResourcesAvailabilityEnum.OpenAll)

    const imgElement = screen.getByAltText('resource icon')
    expect(imgElement).toHaveAttribute('src', openIcon)
  })

  it('should call handleResourcesAvailabilityChange when a new availability option is selected', async () => {
    const elementAppSelect = screen.getByTestId('mock-AppSelect')
    const selectedAvailability = {
      status: ResourcesAvailabilityEnum.OpenManually
    }

    fireEvent.change(elementAppSelect, {
      target: { value: JSON.stringify(selectedAvailability) }
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: setResourcesAvailability.type,
      payload: selectedAvailability
    })
  })
})

describe('CooperationActivities - checkDate function', () => {
  beforeEach(() => {
    useAppSelector.mockReturnValue({
      sections: mockedSections,
      resourcesAvailability: ResourcesAvailabilityEnum.OpenAll
    })

    renderWithProviders(
      <CooperationActivities
        cooperationId='123'
        setEditMode={mockSetEditMode}
      />,
      { store }
    )
  })

  it('should return true and call onResponseError when a resource has OpenFrom status with no date', async () => {
    const saveButton = screen.getByText('common.save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(openAlert).toHaveBeenCalledTimes(1)
      expect(openAlert).toHaveBeenCalledWith({
        severity: snackbarVariants.error,
        message: {
          text: 'errors.VALIDATION_ERROR',
          options: {
            message: 'OpenFrom should be with date.'
          }
        }
      })
    })
  })
})

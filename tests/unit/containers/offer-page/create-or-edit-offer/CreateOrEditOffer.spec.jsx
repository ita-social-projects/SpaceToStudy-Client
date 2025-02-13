import { fireEvent, screen, waitFor } from '@testing-library/react'
import { useLocation } from 'react-router-dom'
import { beforeEach, expect, vi } from 'vitest'

import { snackbarVariants } from '~/constants'
import { URLs } from '~/constants/request'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import { openAlert } from '~/redux/features/snackbarSlice'
import { LanguagesEnum } from '~/types'
import {
  mockAxiosClient,
  renderWithProviders,
  selectOption
} from '~tests/test-utils'

const mockDispatch = vi.fn()
const mockCloseDrawer = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockNavigate,
  useLocation: vi.fn()
}))

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
    useAppDispatch: () => mockDispatch
  }
})

const MOCK_CATEGORY = {
  _id: 'categoryId',
  name: 'Category name'
}

const MOCK_SUBJECT = {
  _id: 'subjectId',
  name: 'Subject name'
}

const MOCK_CATEGORIES_NAMES = [MOCK_CATEGORY]
const MOCK_SUBJECTS_NAMES = [MOCK_SUBJECT]

const fillAndSubmitOfferForm = async () => {
  const categorySelect = screen.getByLabelText('offerPage.labels.category *')
  await selectOption(categorySelect, MOCK_CATEGORY.name)

  const subjectSelect = screen.getByLabelText('offerPage.labels.subject *')
  await selectOption(subjectSelect, MOCK_SUBJECT.name)

  const levelCheckbox = screen.getByLabelText('common.levels.professional')
  expect(levelCheckbox).toBeInTheDocument()
  fireEvent.click(levelCheckbox)

  const offerTitle = screen.getByLabelText('offerPage.labels.title *')
  expect(offerTitle).toBeInTheDocument()
  fireEvent.change(offerTitle, { target: { value: 'Offer Title' } })

  const offerDescription = screen.getByLabelText(
    'offerPage.labels.describe.tutor *'
  )
  expect(offerDescription).toBeInTheDocument()
  fireEvent.change(offerDescription, {
    target: { value: 'Some long offer description...' }
  })

  const languageSelect = screen.getByLabelText('offerPage.labels.language')
  fireEvent.click(languageSelect)
  fireEvent.change(languageSelect, {
    target: { value: LanguagesEnum.English }
  })

  const languageOption = screen.getByRole('option', {
    value: LanguagesEnum.English
  })
  fireEvent.click(languageOption)

  const languageChip = screen.getByText(LanguagesEnum.English)
  expect(languageChip).toBeInTheDocument()

  const offerPrice = screen.getByTestId('price-input')
  expect(offerPrice).toBeInTheDocument()
  fireEvent.change(offerPrice, { target: { value: '1400' } })

  const saveButton = await screen.findByText(
    'offerPage.createOffer.buttonTitles.tutor'
  )
  expect(saveButton).toBeInTheDocument()
  fireEvent.click(saveButton)
}

describe('CreateOrEditOffer', () => {
  beforeEach(() => {
    mockAxiosClient
      .onGet(URLs.categories.getNames)
      .reply(200, MOCK_CATEGORIES_NAMES)

    mockAxiosClient
      .onGet(
        `${URLs.categories.get}/${MOCK_CATEGORY._id}${URLs.subjects.getNames}`
      )
      .reply(200, MOCK_SUBJECTS_NAMES)

    mockAxiosClient.onPost(URLs.offers.create).reply(201)

    useLocation.mockReturnValue({ hash: '' })
  })

  it('should call a dispatch and navigate on successful response', async () => {
    renderWithProviders(<CreateOffer closeDrawer={mockCloseDrawer} />, {
      preloadedState: {
        appMain: {
          userRole: 'tutor'
        }
      }
    })

    await fillAndSubmitOfferForm()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.successMessage'
        })
      )
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/offer-details')
    })
  })

  it('should call different dispatch and navigate with #offer on successful response', async () => {
    useLocation.mockReturnValue({ hash: '#offer' })

    renderWithProviders(<CreateOffer closeDrawer={mockCloseDrawer} />, {
      preloadedState: {
        appMain: {
          userRole: 'tutor'
        }
      }
    })

    await fillAndSubmitOfferForm()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        openAlert({
          severity: snackbarVariants.success,
          message: 'offerPage.createOffer.extendedSuccessMessage.tutor',
          duration: 10000,
          isExtended: true,
          route: '/my-offers'
        })
      )
      expect(mockCloseDrawer).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/my-profile#complete')
    })
  })
})

import { describe, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithProviders } from '~tests/test-utils'

import { UserRoleEnum } from '~/types/user/user.index'

import AddReviewModal from '~/containers/my-cooperations/add-review-modal/AddReviewModal'

const dispatchMock = vi.fn()
const closeModalMock = vi.fn()

const inputProps = {
  data: {
    targetUserId: 'userID',
    targetUserRole: UserRoleEnum.Tutor,
    offer: 'offerText'
  }
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

vi.mock('~/hooks/use-redux', () => ({
  useAppSelector: () => ({
    userRole: UserRoleEnum.Tutor
  }),
  useAppDispatch: () => dispatchMock
}))

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      closeModal: closeModalMock
    })
  }
})

vi.mock('~/hooks/use-mutation', () => ({
  default: ({ onSuccess, onError }) => ({
    mutate: (reviewData) => {
      if (reviewData.comment === 'error-trigger') {
        onError()
      } else {
        onSuccess()
      }
    }
  })
}))

describe('AddReviewModal component', () => {
  beforeEach(() => {
    renderWithProviders(<AddReviewModal {...inputProps} />)

    vi.clearAllMocks()
  })

  it('should render title, description, rating input, textfield, close modal button, submit button', () => {
    expect(
      screen.getByText('cooperationsPage.cooperationDetails.reviewTitle')
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        `cooperationsPage.cooperationDetails.${UserRoleEnum.Tutor}ReviewDescription`
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText('cooperationsPage.cooperationDetails.reviewRating')
    ).toBeInTheDocument()

    expect(
      screen.getByText('cooperationsPage.cooperationDetails.cancel')
    ).toBeInTheDocument()

    expect(
      screen.getByText('cooperationsPage.cooperationDetails.submit')
    ).toBeInTheDocument()

    expect(screen.getByTestId('rating-field')).toBeInTheDocument()

    expect(
      screen.getByLabelText('cooperationsPage.cooperationDetails.reviewLabel')
    ).toBeInTheDocument()
  })

  it('should use dispatch and closeModal on successful submit', async () => {
    const rating = screen.getByTestId('rating-field')
    await userEvent.click(rating.querySelectorAll('input')[3])

    const testField = screen.getByLabelText(
      'cooperationsPage.cooperationDetails.reviewLabel'
    )
    await userEvent.type(testField, 'comment')

    const submitButton = screen.getByText(
      'cooperationsPage.cooperationDetails.submit'
    )
    await userEvent.click(submitButton)

    expect(dispatchMock).toHaveBeenCalled()

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('should use dispatch on failed submit', async () => {
    const rating = screen.getByTestId('rating-field')
    await userEvent.click(rating.querySelectorAll('input')[3])

    const testField = screen.getByLabelText(
      'cooperationsPage.cooperationDetails.reviewLabel'
    )
    await userEvent.type(testField, 'error-trigger')

    const submitButton = screen.getByText(
      'cooperationsPage.cooperationDetails.submit'
    )
    await userEvent.click(submitButton)

    expect(dispatchMock).toHaveBeenCalled()
  })

  it('should call closeModal on close modal button click', async () => {
    const closeButton = screen.getByText(
      'cooperationsPage.cooperationDetails.cancel'
    )
    await userEvent.click(closeButton)

    expect(closeModalMock).toHaveBeenCalled()
  })
})

import { describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { UserRoleEnum } from '~/types/user/user.index'
import userEvent from '@testing-library/user-event'

const callbackMocks = {
  dispatch: vi.fn(),
  closeModal: vi.fn()
}

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
  useAppDispatch: () => callbackMocks.dispatch
}))
vi.mock('~/context/modal-context', () => ({
  useModalContext: () => ({
    closeModal: callbackMocks.closeModal
  })
}))
vi.mock('~/hooks/use-mutation', () => ({
  default: ({ onSuccess, onError }) => ({
    mutate: (ReviewData) => {
      if (ReviewData.comment != 'error-trigger') {
        onSuccess()
      } else {
        onError()
      }
    }
  })
}))

import AddReviewModal from '~/containers/my-cooperations/add-review-modal/AddReviewModal'

describe('AddReviewModal', () => {
  it('render test', async () => {
    render(<AddReviewModal {...inputProps} />)

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

  it('use dispatch and closeModal on successful submit', async () => {
    render(<AddReviewModal {...inputProps} />)

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

    expect(callbackMocks.dispatch).toHaveBeenCalled()
    expect(callbackMocks.closeModal).toHaveBeenCalled()
  })

  it('use dispatch on failed submit', async () => {
    render(<AddReviewModal {...inputProps} />)

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

    expect(callbackMocks.dispatch).toHaveBeenCalled()
  })

  it('call closeModal on close modal button click', async () => {
    render(<AddReviewModal {...inputProps} />)

    const closeButton = screen.getByText(
      'cooperationsPage.cooperationDetails.cancel'
    )
    await userEvent.click(closeButton)

    expect(callbackMocks.closeModal).toHaveBeenCalled()
  })
})

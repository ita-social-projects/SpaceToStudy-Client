import { fireEvent, screen, waitFor } from '@testing-library/react'

import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import { categoryService } from '~/services/category-service'
import { beforeEach, vi } from 'vitest'
import { TestSnackbar, renderWithProviders } from '~tests/test-utils'

vi.mock('~/services/category-service')

const mockSubjectsNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

const mockSendSubjectRequest = vi.fn().mockResolvedValue({
  data: { message: 'Success' },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
})

vi.mock('~/hooks/use-axios', () => ({
  default: vi.fn(() => ({
    fetchData: mockSendSubjectRequest,
    loading: false,
  })),
}))

categoryService.getCategoriesNames.mockResolvedValue({
  data: mockSubjectsNames
})

describe('CreateSubjectModal container', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <ConfirmationDialogProvider>
          <TestSnackbar>
            <CreateSubjectModal />
          </TestSnackbar>
        </ConfirmationDialogProvider>
      )
    })
  })

  it('should render component', () => {
    const title = screen.getByText('categoriesPage.newSubject.title')

    expect(title).toBeInTheDocument()
  })

  it('should change autocomplete by choosing option', async () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    expect(categoryInput).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(categoryInput)
      fireEvent.change(categoryInput, {
        target: { value: 'Category 1' }
      })
      fireEvent.keyDown(categoryInput, { key: 'Escape' })
    })

    expect(categoryInput).toHaveValue('Category 1')

    await waitFor(() => {
      fireEvent.click(categoryInput)
      fireEvent.change(categoryInput, {
        target: { value: '' }
      })
      fireEvent.keyDown(categoryInput, { key: 'Enter' })
    })

    expect(categoryInput).toHaveValue('')
  })

  it('should submit form and call sendSubjectRequest', async () => {
    const subjectInput = screen.getByLabelText('categoriesPage.newSubject.labels.subject')
    const categoryInput = screen.getByLabelText('offerPage.labels.category')
    const infoInput = screen.getByLabelText('offerDetailsPage.enrollOffer.labels.info')
    const submitButton = screen.getByRole('button', { name: 'button.sendRequest' })

    fireEvent.change(subjectInput, { target: { value: 'New Subject' } })
    fireEvent.change(categoryInput, { target: { value: 'Category 1' } })
    fireEvent.change(infoInput, { target: { value: 'Some information' } })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSendSubjectRequest).toHaveBeenCalledTimes(1)
    })

    expect(mockSendSubjectRequest).toHaveBeenCalledWith()
  })
})
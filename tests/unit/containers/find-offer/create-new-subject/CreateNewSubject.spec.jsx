import { fireEvent, screen, waitFor } from '@testing-library/react'

import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import { categoryService } from '~/services/category-service'
import { beforeEach } from 'vitest'
import { TestSnackbar, renderWithProviders } from '~tests/test-utils'

vi.mock('~/services/category-service')

const sendSubjectRequest = (): Promise<AxiosResponse> => {
  return Promise.resolve({
    data: { message: 'Success' },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  } as AxiosResponse)
}

const mockSubjectsNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]
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
  it('should change autocomplete by choosing option', () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    expect(categoryInput).toBeInTheDocument()

    waitFor(() => {
      fireEvent.click(categoryInput)
      fireEvent.change(categoryInput, {
        target: { value: 'Category 1' }
      })
      fireEvent.keyDown(categoryInput, { key: 'Escape' })
    })

    expect(categoryInput.value).toBe('Category 1')

    waitFor(() => {
      fireEvent.click(categoryInput)
      fireEvent.change(categoryInput, {
        target: { value: '' }
      })
      fireEvent.keyDown(categoryInput, { key: 'Enter' })
    })

    expect(categoryInput.value).toBe('')
  })

  describe('sendSubjectRequest', () => {
    it('should return a resolved promise with the correct data', async () => {
      const response = await sendSubjectRequest()

      expect(response).toEqual({
        data: { message: 'Success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
      })
    })

    it('should have a status of 200', async () => {
      const response = await sendSubjectRequest()

      expect(response.status).toBe(200)
    })

    it('should contain a success message in the data', async () => {
      const response = await sendSubjectRequest()

      expect(response.data.message).toBe('Success')
    })
  })
})

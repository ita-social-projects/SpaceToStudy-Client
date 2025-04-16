import { fireEvent, screen } from '@testing-library/react'
import { describe, it, beforeEach, vi } from 'vitest'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CreateSubjectModal from '../../../../../src/containers/find-offer/create-subject/CreateSubject'
import { categoryService } from '~/services/category-service'
import { TestSnackbar, renderWithProviders } from '~tests/test-utils'

vi.mock('~/services/category-service')

const mockSubjectsNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]

describe('CreateSubjectModal container', () => {
  beforeEach(() => {
    categoryService.getCategoriesNames.mockResolvedValue(mockSubjectsNames)

    renderWithProviders(
      <ConfirmationDialogProvider>
        <TestSnackbar>
          <CreateSubjectModal />
        </TestSnackbar>
      </ConfirmationDialogProvider>
    )
  })

  it('should render component', () => {
    const title = screen.getByText('categoriesPage.newSubject.title')
    expect(title).toBeInTheDocument()
  })

  it('should allow selecting and clearing category input', () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    fireEvent.change(categoryInput, { target: { value: 'Category 1' } })
    expect(categoryInput.value).toBe('Category 1')

    fireEvent.change(categoryInput, { target: { value: '' } })
    expect(categoryInput.value).toBe('')
  })

  it('should submit form with correct values', async () => {
    const nameInput = screen.getByLabelText(
      'categoriesPage.newSubject.labels.subject'
    )
    const categoryInput = screen.getByLabelText('offerPage.labels.category')
    const submitBtn = screen.getByRole('button', {
      name: /button.sendRequest/i
    })

    fireEvent.change(nameInput, { target: { value: 'Math' } })
    fireEvent.change(categoryInput, { target: { value: 'Category 1' } })

    fireEvent.click(submitBtn)
    expect(screen.getByRole('combobox')).toHaveValue('Category 1')
  })
})

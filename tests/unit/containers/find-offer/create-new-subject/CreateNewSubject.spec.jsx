import { fireEvent, screen } from '@testing-library/react'

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
categoryService.getCategoriesNames.mockResolvedValue(mockSubjectsNames)

describe('CreateSubjectModal container', () => {
  beforeEach(() => {
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
  it('should change autocomplete by choosing option', () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    expect(categoryInput).toBeInTheDocument()

    fireEvent.click(categoryInput)
    fireEvent.change(categoryInput, {
      target: { value: 'Category 1' }
    })
    fireEvent.keyDown(categoryInput, { key: 'Escape' })

    expect(categoryInput.value).toBe('Category 1')

    fireEvent.click(categoryInput)
    fireEvent.change(categoryInput, {
      target: { value: '' }
    })
    fireEvent.keyDown(categoryInput, { key: 'Enter' })

    expect(categoryInput.value).toBe('')
  })
})

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ConfirmationDialogProvider } from '~/context/confirm-context'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'
import { categoryService } from '~/services/category-service'
import { beforeEach } from 'vitest'

vi.mock('~/services/category-service')

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
      render(
        <ConfirmationDialogProvider>
          <CreateSubjectModal />
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
})

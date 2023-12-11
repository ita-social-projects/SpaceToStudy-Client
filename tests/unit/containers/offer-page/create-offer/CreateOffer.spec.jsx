import React from 'react'
import { beforeEach, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import CreateOffer from '~/containers/offer-page/create-offer/CreateOffer'
import { renderWithProviders } from '~tests/test-utils'
import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

const mockSubjectsNames = [
  { _id: '1', name: 'Category 1' },
  { _id: '2', name: 'Category 2' }
]
categoryService.getCategoriesNames.mockResolvedValue({
  data: mockSubjectsNames
})

const closeDrawerMock = vi.fn()

describe('CreateOffer component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <ConfirmationDialogProvider>
          <CreateOffer closeDrawer={closeDrawerMock} />
        </ConfirmationDialogProvider>,
        {
          preloadedState: { appMain: { userRole: 'tutor' } }
        }
      )
    })
  })

  it('should render correctly', async () => {
    const mainTitle = screen.getByText('offerPage.createOffer.title.tutor')
    const maintDescription = screen.getByText(
      'offerPage.createOffer.description.tutor'
    )
    expect(mainTitle).toBeInTheDocument()
    expect(maintDescription).toBeInTheDocument()
  })

  it('should add and delete a language', () => {
    const languageInput = screen.getByLabelText('offerPage.labels.language')

    fireEvent.click(languageInput)
    fireEvent.change(languageInput, {
      target: { value: 'Spanish' }
    })
    fireEvent.keyDown(languageInput, { key: 'ArrowDown' })
    fireEvent.keyDown(languageInput, { key: 'Enter' })

    expect(screen.getByText('Spanish')).toBeInTheDocument()

    const deleteChipIcon = screen.getByTestId('close-btn')

    fireEvent.click(deleteChipIcon)

    expect(screen.queryByTestId('chip')).not.toBeInTheDocument()
  })
  it('should add price', () => {
    const priceInput = screen.getByTestId('price-input')

    fireEvent.change(priceInput, {
      target: { value: '20' }
    })

    expect(priceInput.value).toBe('20')

    fireEvent.change(priceInput, {
      target: { value: '' }
    })

    expect(priceInput.value).toBe('')
  })
  it('should change category', () => {
    const categoryInput = screen.getByLabelText('offerPage.labels.category')

    waitFor(() => {
      fireEvent.click(categoryInput)
      fireEvent.change(categoryInput, {
        target: { value: 'Category 1' }
      })
      fireEvent.keyDown(categoryInput, { key: 'ArrowDown' })
      fireEvent.keyDown(categoryInput, { key: 'Enter' })
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
  it('should change checkboxes', () => {
    const checkboxProfessional = screen.getByLabelText('Professional')
    fireEvent.click(checkboxProfessional)

    expect(checkboxProfessional).toBeChecked()
  })
})

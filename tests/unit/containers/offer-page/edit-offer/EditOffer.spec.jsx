import React from 'react'
import { beforeEach, expect, vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import { ConfirmationDialogProvider } from '~/context/confirm-context'
import { categoryService } from '~/services/category-service'
import EditOffer from '~/containers/offer-page/edit-offer/EditOffer'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/services/category-service')

export const offerMock = {
  _id: '6480c14f5ca047c53c2ab784',
  price: 100,
  proficiencyLevel: ['Beginner', 'Intermediate'],
  title: 'test title',
  description: 'test description',
  languages: ['Ukrainian'],
  subject: { _id: '6422dbc0823be47b41eeb8d9' },
  category: { _id: '6421ed8ed991d46a84721dfa' },
  FAQ: []
}

const mockCategoriesNames = [
  { _id: '6422dbc0823be47b41eeb8d9', name: 'Category 1' },
  { _id: '6422dbc0823be47b41eeb8d8', name: 'Category 2' }
]

categoryService.getCategoriesNames.mockResolvedValue({
  data: mockCategoriesNames
})

const closeDrawerMock = vi.fn()

describe('CreateOffer component', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <ConfirmationDialogProvider>
          <EditOffer closeDrawer={closeDrawerMock} offer={offerMock} />
        </ConfirmationDialogProvider>,
        {
          preloadedState: { appMain: { userRole: 'tutor' } }
        }
      )
    })
  })

  it('should render correctly', () => {
    const mainTitle = screen.getByText('offerPage.editOffer.title.tutor')
    const mainDescription = screen.getByText(
      'offerPage.editOffer.description.tutor'
    )

    expect(mainTitle).toBeInTheDocument()
    expect(mainDescription).toBeInTheDocument()
  })

  it('should add and delete a language', () => {
    const languageInput = screen.getByLabelText('offerPage.labels.language')
    const chip = screen.queryByTestId('chip')

    expect(screen.getByText('Ukrainian')).toBeInTheDocument()
    expect(chip).toBeInTheDocument()

    const deleteChipIcon = screen.getByTestId('close-btn')

    fireEvent.click(deleteChipIcon)

    expect(chip).not.toBeInTheDocument()

    fireEvent.click(languageInput)
    fireEvent.change(languageInput, {
      target: { value: 'Spanish' }
    })
    fireEvent.keyDown(languageInput, { key: 'ArrowDown' })
    fireEvent.keyDown(languageInput, { key: 'Enter' })

    expect(screen.getByText('Spanish')).toBeInTheDocument()
  })

  it('should add price', () => {
    const priceInput = screen.getByTestId('price-input')

    expect(priceInput.value).toBe('100')

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
    const checkboxBeginner = screen.getByLabelText('Beginner')

    fireEvent.click(checkboxProfessional)

    expect(checkboxProfessional).toBeChecked()
    expect(checkboxBeginner).toBeChecked()
  })
})

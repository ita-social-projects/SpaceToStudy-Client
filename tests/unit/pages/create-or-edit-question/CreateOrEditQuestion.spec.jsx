import { describe } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'

import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import CreateOrEditQuestion from '~/pages/create-or-edit-question/CreateOrEditQuestion'
import { URLs } from '~/constants/request'

const categoriesNamesMock = [
  { _id: '650c27618a9fbf234b8bb4cf', name: 'New category in resources!' },
  { _id: '650c27618a9fbf234b8bb4cd', name: 'Category 1' }
]

describe('CreateOrEditQuestion component test', () => {
  mockAxiosClient
    .onGet(URLs.resources.resourcesCategories.getNames)
    .reply(200, categoriesNamesMock)

  beforeEach(() => {
    renderWithProviders(<CreateOrEditQuestion />)
  })

  it('should display CreateQuestion form', () => {
    const title = screen.getByLabelText('questionPage.untitled')

    expect(title).toBeInTheDocument()
  })

  it('should choose category', () => {
    const autocomplete = screen.getByRole('combobox')

    expect(autocomplete).toBeInTheDocument()
    expect(autocomplete.value).toBe('')

    fireEvent.click(autocomplete)
    fireEvent.change(autocomplete, {
      target: { value: categoriesNamesMock[1].name }
    })
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
    fireEvent.keyDown(autocomplete, { key: 'Enter' })

    expect(autocomplete.value).toBe(categoriesNamesMock[1].name)
  })
})

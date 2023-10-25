import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { beforeEach, describe, it } from 'vitest'

import CreateOrEditQuestionModal from '~/containers/my-resources/create-or-edit-question-modal/CreateOrEditQuestionModal'
import { URLs } from '~/constants/request'

const onCancel = vi.fn()
const onSave = vi.fn()

const categoriesNamesMock = [
  { _id: '650c27618a9fbf234b8bb4cf', name: 'New category in resources!' },
  { _id: '650c27618a9fbf234b8bb4cd', name: 'Category 1' }
]

const initialDataMock = {
  title: 'Question Title',
  category: null
}

describe('EditAttachmentModal component', () => {
  mockAxiosClient
    .onGet(URLs.resources.resourcesCategories.getNames)
    .reply(200, categoriesNamesMock)

  beforeEach(() => {
    renderWithProviders(
      <CreateOrEditQuestionModal
        actions={{ onCancel, onSave }}
        initialData={initialDataMock}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.quizzes.createNewQuestion')

    expect(title).toBeInTheDocument()
  })

  it('should render save button and click on it', () => {
    const saveBtn = screen.getByText('common.save')

    expect(saveBtn).toBeInTheDocument()

    fireEvent.click(saveBtn)

    expect(onSave).toHaveBeenCalled()
  })

  it('should change category', () => {
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

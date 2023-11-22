import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { beforeEach, describe } from 'vitest'

import AddAttachmentCategoryModal from '~/containers/my-resources/add-attachment-category-modal/AddAttachmentCategoryModal'
import { URLs } from '~/constants/request'

const closeModalMock = vi.fn()
const updateAttachmentCategory = vi.fn()

const categoriesNamesMock = [
  { _id: '1', name: 'History' },
  { _id: '2', name: 'Music' }
]

const attachmentMock = {
  _id: '651eb01561e2ac6d2995b76c',
  author: '648afee884936e09a37deaaa',
  fileName: 'file.pdf',
  link: '1696522954946-Doc13.pdf',
  size: 15000,
  createdAt: '2023-11-05T12:46:13.081Z',
  updatedAt: '2023-11-05T16:22:35.063Z',
  description: 'Description',
  category: null
}

describe('AddAttachmentCategoryModal component', () => {
  mockAxiosClient
    .onGet(URLs.resources.resourcesCategories.getNames)
    .reply(200, categoriesNamesMock)

  beforeEach(() => {
    renderWithProviders(
      <AddAttachmentCategoryModal
        attachment={attachmentMock}
        closeModal={closeModalMock}
        updateAttachmentCategory={updateAttachmentCategory}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.categories.selectCategory')

    expect(title).toBeInTheDocument()
  })

  it('should render save button and click on it', () => {
    const saveBtn = screen.getByText('common.save')

    expect(saveBtn).toBeInTheDocument()

    fireEvent.click(saveBtn)

    expect(updateAttachmentCategory).toHaveBeenCalled()
  })

  it('should change category', () => {
    const categoryDropbox = screen.getByRole('combobox')

    fireEvent.click(categoryDropbox)
    fireEvent.change(categoryDropbox, {
      target: { value: categoriesNamesMock[1].name }
    })
    fireEvent.keyDown(categoryDropbox, { key: 'ArrowDown' })
    fireEvent.keyDown(categoryDropbox, { key: 'Enter' })

    expect(categoryDropbox.value).toBe(categoriesNamesMock[1].name)
  })
})

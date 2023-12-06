import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { beforeEach, describe } from 'vitest'

import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import { URLs } from '~/constants/request'

const closeModalMock = vi.fn()
const createCategory = vi.fn()

const createdCategoryMock = {
  _id: '650b14441e8d4a4484e2e2f5',
  name: 'New category',
  author: '6494128829631adbaf5cf615',
  createdAt: '2023-20-01T13:25:36.292Z',
  updatedAt: '2023-20-01T13:25:36.292Z'
}

describe('AddCategoriesModal component', () => {
  mockAxiosClient
    .onPost(URLs.resources.resourcesCategories.post)
    .reply(201, createdCategoryMock)

  beforeEach(() => {
    renderWithProviders(
      <AddCategoriesModal
        closeModal={closeModalMock}
        createCategories={createCategory}
      />
    )
  })

  it('should render title', () => {
    const title = screen.getByText('myResourcesPage.categories.addBtn')

    expect(title).toBeInTheDocument()
  })

  it('create button should be not clickable, when we do not have text in input', () => {
    const createBtn = screen.getByText('common.create')

    expect(createBtn).toBeInTheDocument()

    fireEvent.click(createBtn)

    expect(createCategory).not.toHaveBeenCalled()
  })

  it('should render create button and click on it, when we have text in input', () => {
    const createBtn = screen.getByText('common.create')
    const nameInput = screen.getByRole('textbox')

    waitFor(() => {
      fireEvent.change(nameInput, { target: { value: 'New Category' } })
    })

    expect(createBtn).toBeInTheDocument()

    fireEvent.click(createBtn)

    expect(createCategory).toHaveBeenCalled()

    fireEvent.change(nameInput, { target: { value: '' } })
  })

  it('closes the modal when cancel button is clicked', () => {
    const cancelButton = screen.getByText('common.cancel')
    fireEvent.click(cancelButton)

    expect(closeModalMock).toHaveBeenCalled()
  })

  it('handles form submission', async () => {
    const nameInput = screen.getByRole('textbox')

    fireEvent.change(nameInput, { target: { value: 'New Category' } })

    const createButton = screen.getByText('common.create')
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(createCategory).toHaveBeenCalledWith({ name: 'New Category' })

      const request = mockAxiosClient.handlers.post[0]
      const responseStatus = request[3]
      const responseData = request[4]

      expect(responseStatus).toBe(201)
      expect(responseData).toEqual(createdCategoryMock)
    })
  })
})

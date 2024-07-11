import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import { renderWithProviders, waitForTimeout } from '~tests/test-utils'
import { SortEnum } from '~/types'

const fetchDataMock = vi.fn()
const text = 'test search'
const route = '/my-resources'

const props = {
  btnText: 'myResourcesPage.quizzes.newQuizBtn',
  placeholder: 'common.search',
  fetchData: fetchDataMock,
  link: '#',
  searchRef: { current: text },
  selectedItems: [],
  sortOptions: {
    onRequestSort: vi.fn(),
    resetSort: vi.fn(),
    sort: { order: SortEnum.Desc, orderBy: 'updatedAt' }
  }
}

describe('AddResourceWithInput test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(<AddResourceWithInput {...props} />, {
        initialEntries: route
      })
    })
  })

  it('should render search with button', async () => {
    const addBtn = screen.getByText('myResourcesPage.quizzes.newQuizBtn')
    const searchInput = screen.getByPlaceholderText('common.search')

    expect(addBtn).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  it('should change and clear search input', async () => {
    const user = userEvent.setup()

    const searchInput = screen.getByPlaceholderText('common.search')

    await waitForTimeout(() => user.type(searchInput, text))

    expect(searchInput.value).toBe(text)

    const clearIcon = screen.getByTestId('clearIcon')

    fireEvent.click(clearIcon)

    expect(searchInput.value).toBe('')
    expect(fetchDataMock).toHaveBeenCalled()
  })
})

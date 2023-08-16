import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'

const fetchDataMock = vi.fn()
const onClickMock = vi.fn()
const text = 'test search'

const props = {
  btnText: 'myResourcesPage.quizzes.newQuizBtn',
  fetchData: fetchDataMock,
  onClick: onClickMock,
  searchRef: { current: text }
}

describe('AddResourceWithInput test', () => {
  beforeEach(() => {
    render(<AddResourceWithInput {...props} />)
  })

  it('should render search with button', async () => {
    const addBtn = screen.getByText('myResourcesPage.quizzes.newQuizBtn')
    const searchInput = screen.getByPlaceholderText('common.search')

    expect(addBtn).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
  })

  it('should change and clear search input', async () => {
    const searchInput = screen.getByPlaceholderText('common.search')

    userEvent.type(searchInput, text)

    expect(searchInput.value).toBe(text)

    const clearIcon = screen.getByTestId('clearIcon')

    fireEvent.click(clearIcon)

    expect(searchInput.value).toBe('')
    expect(fetchDataMock).toHaveBeenCalled()
  })
  it('should click on add button', async () => {
    const addBtn = screen.getByText('myResourcesPage.quizzes.newQuizBtn')

    fireEvent.click(addBtn)

    expect(onClickMock).toHaveBeenCalled()
  })
})

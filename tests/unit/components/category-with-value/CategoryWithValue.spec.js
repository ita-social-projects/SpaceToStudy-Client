import { act, render, screen, fireEvent } from '@testing-library/react'
import CategoryWithValue from '~/components/category-with-value/CategoryWithValue'

const stateItems = [{}]
const categoryLabel = 'Label'
const categoryOptions = ['category1', 'category2']
const setStateItems = jest.fn()
const valueLabel = 'Value'
const valueOptions = ['value1', 'value2']
const btnText = 'Add more'

describe('CategoryWithValue test', () => {
  it('should render button', () => {
    render(
      <CategoryWithValue
        btnText={ btnText }
        categoryLabel={ categoryLabel }
        categoryOptions={ categoryOptions }
        setStateItems={ setStateItems }
        stateItems={ stateItems }
        valueLabel={ valueLabel }
        valueOptions={ valueOptions }
      />
    )
    const button = screen.getByText(/Add more/i)

    expect(button).toBeInTheDocument()
  })
  it('should select category', async () => {
    render(
      <CategoryWithValue
        btnText={ btnText }
        categoryLabel={ categoryLabel }
        categoryOptions={ categoryOptions }
        setStateItems={ setStateItems }
        stateItems={ stateItems }
        valueLabel={ valueLabel }
        valueOptions={ valueOptions }
      />
    )
    const autocomplete = screen.queryAllByRole('textbox')
    act(() => {
      fireEvent.mouseDown(autocomplete[0])
    })

    const option = screen.getByText('category1')
    act(() => {
      fireEvent.click(option)
    })

    expect(setStateItems).toHaveBeenCalledTimes(1)
  })

  it('should render delete button', async () => {
    render(
      <CategoryWithValue
        btnText={ btnText }
        categoryLabel={ categoryLabel }
        categoryOptions={ categoryOptions }
        setStateItems={ setStateItems }
        stateItems={ [{}, {}] }
        valueLabel={ valueLabel }
        valueOptions={ valueOptions }
      />
    )
    const deleteBtn = screen.queryAllByTestId('deleteBtn')

    expect(deleteBtn).toHaveLength(2)
  })

  it('should delete items', async () => {
    render(
      <CategoryWithValue
        btnText={ btnText }
        categoryLabel={ categoryLabel }
        categoryOptions={ categoryOptions }
        setStateItems={ setStateItems }
        stateItems={ [{}, {}] }
        valueLabel={ valueLabel }
        valueOptions={ valueOptions }
      />
    )
    const deleteBtn = screen.queryAllByTestId('deleteBtn')

    fireEvent.click(deleteBtn[0])

    expect(setStateItems).toHaveBeenCalledTimes(1)
  })
})

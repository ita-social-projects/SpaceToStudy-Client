import { act, render, screen, fireEvent } from '@testing-library/react'
import AutocompleteFromOptions from '~/components/autocomplete-from-options/AutocompleteFromOptions'

const setStateItems = jest.fn()
const btnText = 'Add more'
const options = {
  language: { options: ['category1', 'category2'], label: 'Category', disableSelected: true },
  level: { options: ['value1', 'value2'], label: 'Value' }
}

describe('AutocompleteFromOptions test', () => {
  it('should render add button', () => {
    render(
      <AutocompleteFromOptions
        btnText={ btnText } formState={ [{}] } handleFormChange={ setStateItems }
        options={ options }
      />
    )
    const button = screen.getByText(/Add more/i)

    expect(button).toBeInTheDocument()
  })
  it('should handle selection', async () => {
    render(
      <AutocompleteFromOptions
        btnText={ btnText } formState={ [{}] } handleFormChange={ setStateItems }
        options={ options }
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
      <AutocompleteFromOptions
        btnText={ btnText }
        formState={ [{}, {}] }
        handleFormChange={ setStateItems }
        options={ options }
      />
    )
    const deleteBtn = screen.queryAllByTestId('deleteBtn')

    expect(deleteBtn).toHaveLength(2)
  })

  it('should delete items', async () => {
    render(
      <AutocompleteFromOptions
        btnText={ btnText }
        formState={ [{}, {}] }
        handleFormChange={ setStateItems }
        options={ options }
      />
    )
    const deleteBtn = screen.queryAllByTestId('deleteBtn')

    fireEvent.click(deleteBtn[0])

    expect(setStateItems).toHaveBeenCalledTimes(1)
  })
})

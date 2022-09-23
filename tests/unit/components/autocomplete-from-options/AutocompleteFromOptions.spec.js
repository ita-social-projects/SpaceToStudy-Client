import { render, screen, fireEvent } from '@testing-library/react'
import AutocompleteFromOptions from '~/components/autocomplete-from-options/AutocompleteFromOptions'

const handleFormChange = jest.fn()
const getOptionLabel = jest.fn()
const btnText = 'Add more'
const options = {
  language: { options: ['category1', 'category2'], label: 'Category', getOptionLabel, disableSelected: true },
  level: { options: ['value1', 'value2'], label: 'Value', getOptionLabel }
}

describe('AutocompleteFromOptions test', () => {
  it('should add inputs', () => {
    render(
      <AutocompleteFromOptions
        btnText={ btnText }
        formState={ [{}] }
        handleFormChange={ handleFormChange }
        options={ options }
      />
    )
    const button = screen.getByText(/Add more/i)
    fireEvent.click(button)

    expect(button).toBeInTheDocument()
    expect(handleFormChange).toHaveBeenCalledTimes(1)
  })
  it('should handle selection', async () => {
    getOptionLabel.mockImplementation((option) => option)
    render(
      <AutocompleteFromOptions
        btnText={ btnText }
        formState={ [{}] }
        handleFormChange={ handleFormChange }
        options={ options }
      />
    )
    const autocomplete = screen.queryAllByRole('textbox')
    fireEvent.mouseDown(autocomplete[0])

    const option = screen.getByText('category1')
    fireEvent.click(option)

    expect(handleFormChange).toHaveBeenCalledTimes(1)
  })

  it('should render delete button', async () => {
    render(
      <AutocompleteFromOptions
        btnText={ btnText }
        formState={ [{}, {}] }
        handleFormChange={ handleFormChange }
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
        handleFormChange={ handleFormChange }
        options={ options }
      />
    )
    const deleteBtn = screen.queryAllByTestId('deleteBtn')

    fireEvent.click(deleteBtn[0])

    expect(handleFormChange).toHaveBeenCalledTimes(1)
  })
})

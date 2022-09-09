import { render, screen, fireEvent } from '@testing-library/react'
import CategoryWithValue from '~/components/category-with-value/CategoryWithValue'

const stateItems = [{}]
const categoryLabel = 'Label'
const categoryOptions = ['category1', 'category2']
const setStateItems = jest.fn()
const valueLabel = 'Value'
const valueOptions = ['value1', 'value2']
const btnText = 'Add more'

describe('CategoryWithValue test', () => {
  beforeEach(() => {
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
  })

  it('should render button', () => {
    const button = screen.getByText('Add more')

    expect(button).toBeInTheDocument()
  })
})

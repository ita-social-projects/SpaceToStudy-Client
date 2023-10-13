import { render, screen, fireEvent } from '@testing-library/react'
import FilterSelector from '~/components/filter-selector/FilterSelector'

vi.mock('simplebar-react', () => {
  return {
    __esModule: true,
    default: function MockedSimpleBar(props) {
      return <div>{props.children}</div>
    }
  }
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'common.noItems': 'No items found'
      }
      return translations[key] || key
    }
  })
}))

beforeEach(() => {
  const selectedItems = []

  render(<FilterSelector selectedItems={selectedItems} />)
})

describe('FilterSelector', () => {
  it('FilterSelector component renders correctly', () => {
    const buttonEl = screen.getByRole('button')

    expect(buttonEl).toBeInTheDocument()
  })

  it('renders no items message after clicking if there are no selected items', () => {
    const buttonEl = screen.getByRole('button')

    fireEvent.click(buttonEl)

    const el = screen.getByText('No items found')

    expect(el).toBeInTheDocument()
  })
  it('input field should be in the component after clicking on a button', () => {
    const buttonEl = screen.getByRole('button')

    fireEvent.click(buttonEl)

    const inputEl = screen.getByRole('textbox')

    expect(inputEl).toBeInTheDocument()
  })
})

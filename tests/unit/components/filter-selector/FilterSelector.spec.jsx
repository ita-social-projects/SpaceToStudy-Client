import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
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
      return translations[key] || key // Return the custom translation or the key itself
    }
  })
}))
describe('FilterSelector', () => {
  const selectedItems = []
  test('FilterSelector component renders correctly', () => {
    render(<FilterSelector selectedItems={selectedItems} />)
    const el = screen.getByRole('button')
    expect(el).toBeInTheDocument()
  })

  test('renders no items after clicking', async () => {
    render(<FilterSelector selectedItems={[]} />)
    const buttonEl = screen.getByRole('button')
    await user.click(buttonEl)
    const noItemsText = screen.getByRole('presentation')
    expect(noItemsText).toHaveTextContent('No items found')
  })
  test('icon should be in the component', async () => {
    render(<FilterSelector selectedItems={[]} />)
    const buttonEl = screen.getByRole('button')
    await user.click(buttonEl)
    const inputEl = screen.getByRole('textbox')
    expect(inputEl).toBeInTheDocument()
  })
})

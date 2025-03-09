import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppButtonMenu from '~/components/app-button-menu/AppButtonMenu'
import { renderWithProviders } from '~tests/test-utils'

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

  renderWithProviders(<AppButtonMenu selectedItems={selectedItems} />)
})

describe('AppButtonMenu', () => {
  it('AppButtonMenu component renders correctly', () => {
    const buttonEl = screen.getByRole('button')

    expect(buttonEl).toBeInTheDocument()
  })
  it('input field should be in the component after clicking on a button', () => {
    const buttonEl = screen.getByRole('button')

    fireEvent.click(buttonEl)

    const inputEl = screen.getByRole('textbox')

    expect(inputEl).toBeInTheDocument()
  })
})

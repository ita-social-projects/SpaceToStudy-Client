import { fireEvent, screen } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const value = null
const label = 'common.labels.country'
const options = ['Finland', 'France', 'Georgia', 'Germany']
const onChange = vi.fn()
const styles = {}

describe('AppAutoComplete test', () => {
  beforeEach(() => {
    renderWithProviders(
      <AppAutoComplete
        onChange={onChange}
        options={options}
        sx={styles}
        textFieldProps={{
          label: label
        }}
        type='text'
        value={value}
      />
    )
  })

  test('Should render Autocomplete and choose option', () => {
    const autocomplete = screen.getByLabelText(/common.labels.country/i)

    fireEvent.mouseDown(autocomplete)

    const option = screen.getByText('France')

    fireEvent.click(option)

    expect(onChange).toHaveBeenCalled()
  })
})

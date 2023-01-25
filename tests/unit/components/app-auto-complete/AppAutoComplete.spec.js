import { fireEvent, screen } from '@testing-library/react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { renderWithProviders } from '~tests/test-utils'

const props = {
  fieldName: 'country',
  fieldValue: null,
  label: 'common.labels.country',
  propOptions: ['Finland', 'France', 'Georgia', 'Germany'],
  setFieldValue: jest.fn(),
  styles: {}
}

describe('AppAutoComplete test', () => {
  beforeEach(() => {
    renderWithProviders(<AppAutoComplete { ...props } />)
  })

  test('Should render Autocomplete and choose option', async () => {
    const autocomplete = screen.getByLabelText(/common.labels.country/i)

    fireEvent.mouseDown(autocomplete)

    const option = screen.getByText('France')
    fireEvent.click(option)

    expect(props.setFieldValue).toHaveBeenCalledWith('country', 'France')
  })
})

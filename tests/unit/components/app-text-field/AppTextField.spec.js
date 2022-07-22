import { screen } from '@testing-library/react'
import AppTextField from '~/components/app-text-field/AppTextField'
import { renderWithProviders } from '~tests/test-utils'

describe('AppTextField test', () => {
  it('should render input without error message', () => {
    renderWithProviders(<AppTextField />)
    const errorMsg = screen.queryByText('error')

    expect(errorMsg).not.toBeInTheDocument()
  })

  it('should render input with error message', () => {
    const message = 'This field cannot be empty'
    renderWithProviders(<AppTextField errorMsg={message} />)
    const errorMsg = screen.getByText(message)

    expect(errorMsg).toBeInTheDocument()
  })
})

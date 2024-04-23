import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AppIconButton from '~/components/app-icon-button/AppIconButton'

describe('test AppIconButton component', () => {
  it('Should render a link when url is passed', () => {
    renderWithProviders(
      <AppIconButton to='https://example.com'>I</AppIconButton>
    )

    const iconButtonElement = screen.getByRole('link')

    expect(iconButtonElement).toBeInTheDocument()
  })
})

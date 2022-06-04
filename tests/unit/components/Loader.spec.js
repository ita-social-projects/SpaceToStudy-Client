import { screen } from '@testing-library/react'

import Loader from '~/components/loader/Loader'
import { renderWithRouterAndTheme } from '~tests/test-utils'

describe('Loader test', () => {
  it('should render loader', () => {
    renderWithRouterAndTheme(<Loader size={ 70 } />)
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})

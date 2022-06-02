import { screen } from '@testing-library/react'

import Loader from '~/components/loader/Loader'
import { renderWithTheme } from '~tests/test-utils'

describe('Loader test', () => {
  it('should render loader', () => {
    renderWithTheme(<Loader size={ 70 } />)
    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})

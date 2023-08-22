import { fireEvent, render, screen } from '@testing-library/react'

import IconsWithCounter from '~/components/icons-with-counter/IconsWithCounter'

describe('IconWithCounter test', () => {
  const testValue = 10
  beforeEach(() => {
    render(<IconsWithCounter maxValue={testValue} />)
  })

  it('should increment data', () => {
    const buttonIncrement = screen.getByTestId('IconUp')

    fireEvent.click(buttonIncrement)
    expect(screen.getByText('1 common.of 10')).toBeTruthy()
  })

  it('should decrement data', () => {
    const buttonDecrement = screen.getByTestId('IconDown')

    fireEvent.click(buttonDecrement)
    expect(screen.getByText('10 common.of 10')).toBeTruthy()
  })
})

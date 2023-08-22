import { fireEvent, render, screen } from '@testing-library/react'

import SearchByMessage from '~/components/search-by-message/SearchByMessage'

describe('SearchByMessage', () => {
  const testValue = 'test data'
  beforeEach(() => {
    render(<SearchByMessage maxValue={10} />)
  })

  it('should change and clear input value', () => {
    const input = screen.getByPlaceholderText('common.search...')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: testValue } })

    const button = screen.getByTestId('clearIcon')
    fireEvent.click(button)

    expect(input.value).not.toBe(testValue)
  })
})

import { fireEvent, render, screen } from '@testing-library/react'

import SearchByMessage from '~/components/search-by-message/SearchByMessage'

describe('SearchByMessage', () => {
  const testValue = 'test data'
  beforeEach(() => {
    render(<SearchByMessage maxValue={10} />)
  })

  it('test 1', () => {
    const input = screen.getByPlaceholderText('common.search...')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: testValue } })

    expect(input.value).toBe(testValue)
  })

  it('test 2', () => {
    const input = screen.getByPlaceholderText('common.search...')

    fireEvent.click(input)
    fireEvent.change(input, { target: { value: testValue } })

    const button = screen.getByTestId('clearIcon')
    fireEvent.click(button)

    expect(input.value).not.toBe(testValue)
  })
})

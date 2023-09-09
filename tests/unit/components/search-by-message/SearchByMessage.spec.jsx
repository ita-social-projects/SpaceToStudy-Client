import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import SearchByMessage from '~/components/search-by-message/SearchByMessage'

describe('SearchByMessage', () => {
  const onFilteredMessagesChange = vi.fn()
  const onFilteredIndexChange = vi.fn()
  const isCloseSearch = vi.fn()
  const mockMessage = [
    {
      _id: '64ee0a2f6ae3b95ececb05b5',
      author: {
        _id: '6421d9833cdf38b706756dff'
      },
      authorRole: 'student',
      text: 'Hello from there!',
      isRead: false,
      chat: '64a543b5afb24d9c76bfdef1',
      createdAt: '2023-07-03T08:55:53.812Z',
      updatedAt: '2023-07-03T08:55:53.812Z'
    },
    {
      _id: '64ee0de96ae3b95ececb05bb',
      author: {
        _id: '6494128829631adbaf5cf615',
        photo: '1687425744398-ITA wallpapers-19.png'
      },
      authorRole: 'tutor',
      text: 'Hello from tutor!',
      isRead: false,
      chat: '64a543b5afb24d9c76bfdef1',
      createdAt: '2023-07-03T08:55:53.812Z',
      updatedAt: '2023-07-03T08:55:53.812Z'
    }
  ]

  const testValue = 'test data'
  beforeEach(() => {
    render(
      <SearchByMessage
        isCloseSearch={isCloseSearch}
        messages={mockMessage}
        onFilteredIndexChange={onFilteredIndexChange}
        onFilteredMessagesChange={onFilteredMessagesChange}
      />
    )
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

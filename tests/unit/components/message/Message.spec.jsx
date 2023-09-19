import { screen } from '@testing-library/react'

import Message from '~/components/message/Message'

import { renderWithProviders } from '~tests/test-utils'
import { getFormattedDate } from '~/utils/helper-functions'
import { messagesMock } from '~tests/unit/containers/chat/list-of-users-with-search/MockChat.spec.constants'

const messageMock = messagesMock[0]

describe('Message component', () => {
  beforeEach(() => {
    renderWithProviders(
      <Message
        filteredIndex={1}
        filteredMessages={['Some text']}
        message={messageMock}
      />
    )
  })

  it('should render the author name and message content', () => {
    const messageText = screen.getByText(messageMock.text)

    expect(messageText).toBeInTheDocument()
  })

  it('should format the timestamp correctly', () => {
    const formattedDate = getFormattedDate({
      date: messageMock.createdAt,
      options: { hour: '2-digit', minute: '2-digit' }
    })

    const messageDate = screen.getByText(formattedDate)

    expect(messageDate).toBeInTheDocument()
  })
})

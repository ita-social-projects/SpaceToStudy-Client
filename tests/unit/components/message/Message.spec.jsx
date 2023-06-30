import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import someAvatar from '~/assets/img/student-home/bag.png'
import { getFormatedDate } from '~/utils/helper-functions'
import { UserRoleEnum } from '~/types'

import Message from '~/components/message/Message'

describe('Message component', () => {
  const newAuthor = {
    _id: '1234',
    firstName: 'Kyle',
    lastName: 'Jason',
    photo: someAvatar
  }

  const mockMessage = {
    _id: 'newmess1',
    author: newAuthor,
    authorRole: UserRoleEnum.Student,
    messageContent: 'how about some bruh moment',
    timestamp: new Date()
  }

  it('should render the author name and message content', () => {
    render(
      <Router>
        <Message message={mockMessage} />
      </Router>
    )

    const authorNameElement = screen.getByText(/Kyle Jason/i)
    const messageContentElement = screen.getByText(
      /how about some bruh moment/i
    )

    expect(authorNameElement).toBeInTheDocument()
    expect(messageContentElement).toBeInTheDocument()
  })

  it('should format the timestamp correctly', () => {
    render(
      <Router>
        <Message message={mockMessage} />
      </Router>
    )

    const timestampElement = screen.getByText(
      getFormatedDate(mockMessage.timestamp)
    )

    expect(timestampElement).toBeInTheDocument()
  })
})

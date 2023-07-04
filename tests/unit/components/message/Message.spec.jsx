import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import someAvatar from '~/assets/img/student-home/bag.png'
import { UserRoleEnum } from '~/types'
import { getFormatedDate } from '~/utils/helper-functions'

import Message from '~/components/message/Message'

describe('Message component', () => {
  const newAuthor = {
    _id: '1234',
    firstName: 'Kyle',
    lastName: 'Jason',
    photo: someAvatar,
    createdAt: new Date()
  }

  const mockMessage = {
    _id: 'newmess1',
    author: newAuthor,
    authorRole: UserRoleEnum.Student,
    messageContent: 'how about some bruh moment'
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
      getFormatedDate(newAuthor.createdAt)
    )

    expect(timestampElement).toBeInTheDocument()
  })
})

import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import { UserRoleEnum } from '~/types'
import { getFormatedDate } from '~/utils/helper-functions'

import someAvatar from '~/assets/img/student-home/bag.png'
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

  beforeEach(() => {
    renderWithProviders(<Message message={mockMessage} />)
  })

  it('should render the author name and message content', () => {
    const authorNameElement = screen.getByText(/Kyle Jason/i)
    const messageContentElement = screen.getByText(
      /how about some bruh moment/i
    )

    expect(authorNameElement).toBeInTheDocument()
    expect(messageContentElement).toBeInTheDocument()
  })

  it('should format the timestamp correctly', () => {
    const timestampElement = screen.getByText(
      getFormatedDate(newAuthor.createdAt)
    )

    expect(timestampElement).toBeInTheDocument()
  })
})

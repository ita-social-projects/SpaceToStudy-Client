import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import AboutChatSidebar from '~/containers/about-chat-sidebar/AboutChatSidebar'

vi.mock('simplebar-react', () => {
  return {
    default: ({ children }) => <div>{children}</div>
  }
})

const mockUser = {
  _id: 'user_id',
  firstName: 'John',
  lastName: 'Doe',
  photo: 'user_photo_url',
  professionalSummary: 'User description'
}

const mockMember = { user: mockUser, role: 'tutor' }

const mockLinks = [
  {
    _id: 'l1',
    name: 'Space2Study WebApp',
    createdAt: '2023-07-24T11:16:06.685Z',
    updatedAt: '2023-07-24T11:16:06.685Z',
    url: 'https://s2s-front-stage.azurewebsites.net/'
  }
]

const setup = (props) => {
  const utils = render(
    <BrowserRouter>
      <AboutChatSidebar {...props} />
    </BrowserRouter>
  )
  return {
    ...utils
  }
}

describe('AboutChatSidebar component test', () => {
  it('should  render user information', () => {
    setup({
      member: mockMember,
      links: []
    })

    const userName = screen.getByText('John Doe')
    const viewButton = screen.getByText('chatPage.sidebar.viewButton')

    expect(userName).toBeInTheDocument()
    expect(viewButton).toBeInTheDocument()
  })

  it('should render links', () => {
    setup({
      member: mockMember,
      media: [],
      files: [],
      links: mockLinks
    })

    expect(screen.getByText('Space2Study WebApp')).toBeInTheDocument()
  })
})

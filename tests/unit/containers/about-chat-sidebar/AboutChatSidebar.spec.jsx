import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import AboutChatSidebar from '~/containers/about-chat-sidebar/AboutChatSidebar'

import someAvatar from '~/assets/img/user-profile-page/avatar.png'

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

const mockMedia = [
  {
    _id: 'm1',
    name: 'Cool pic',
    path: someAvatar,
    createdAt: '2023-06-11T11:16:06.685Z',
    updatedAt: '2023-06-11T11:16:06.685Z'
  }
]

const mockFiles = [
  {
    _id: 'f1',
    name: 'Cool book.pdf',
    size: 13.4,
    createdAt: '2023-08-24T11:16:06.685Z',
    updatedAt: '2023-08-24T11:16:06.685Z',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

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
      media: [],
      files: [],
      links: []
    })

    const userName = screen.getByText('John Doe')
    const viewButton = screen.getByText('chatPage.sidebar.viewButton')

    expect(userName).toBeInTheDocument()
    expect(viewButton).toBeInTheDocument()
  })

  it('should render media', () => {
    setup({
      member: mockMember,
      media: mockMedia,
      files: [],
      links: []
    })

    expect(screen.getByAltText('Cool pic')).toBeInTheDocument()
  })

  it('should render files', () => {
    setup({
      member: mockMember,
      media: [],
      files: mockFiles,
      links: []
    })

    expect(screen.getByText('Cool book.pdf')).toBeInTheDocument()
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

import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import AboutChatSidebar from '~/containers/about-chat-sidebar/AboutChatSidebar'

import someAvatar from '~/assets/img/tutor-profile-page/avatar.png'
import someAvatar1 from '~/assets/img/tutor-profile-page/presentationVideoImg.png'

const mockUser = {
  _id: 'user_id',
  firstName: 'John',
  lastName: 'Doe',
  photo: 'user_photo_url',
  role: 'user_role',
  professionalSummary: 'User description'
}

const mockMedia = Array(2).fill(someAvatar)
mockMedia[1] = someAvatar1

const mockFiles = [
  {
    _id: 'f1',
    name: 'Cool book.pdf',
    size: 13.4,
    uploadedDate: new Date('2022-06-01T19:50:21.817Z'),
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    _id: 'f2',
    name: 'Awesome document.doc',
    size: 9.8,
    uploadedDate: new Date('2023-02-01T23:50:21.817Z'),
    url: 'https://google.com'
  }
]

const mockLinks = [
  {
    _id: 'l1',
    name: 'Space2Study WebApp',
    url: 'https://s2s-front-stage.azurewebsites.net/'
  },
  {
    _id: 'l2',
    name: 'Google',
    url: 'https://google.com'
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

describe('AboutChatSidebar', () => {
  test('renders component with user information', () => {
    setup({
      user: mockUser,
      media: [],
      files: [],
      links: []
    })

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('chat.sidebar.viewButton')).toBeInTheDocument()
  })

  test('renders media when available', () => {
    setup({
      user: mockUser,
      media: mockMedia,
      files: [],
      links: []
    })

    expect(screen.getByAltText(someAvatar)).toBeInTheDocument()
    expect(screen.getByAltText(someAvatar1)).toBeInTheDocument()
  })

  test('renders files when available', () => {
    setup({
      user: mockUser,
      media: [],
      files: mockFiles,
      links: []
    })

    expect(screen.getByText('Cool book.pdf')).toBeInTheDocument()
    expect(screen.getByText('Awesome document.doc')).toBeInTheDocument()
  })

  test('renders links when available', () => {
    setup({
      user: mockUser,
      media: [],
      files: [],
      links: mockLinks
    })

    expect(screen.getByText('Space2Study WebApp')).toBeInTheDocument()
    expect(screen.getByText('Google')).toBeInTheDocument()
  })

  test('triggers the closeSidebar function when the close button is clicked', () => {
    const { getByRole } = setup({
      user: mockUser,
      media: [],
      files: [],
      links: []
    })

    const closeButton = getByRole('button', { name: 'close' })
    fireEvent.click(closeButton)

    expect(screen.queryByText('About')).toBeNull()
  })

  test('shows "There are no any elements here yet!" if empty data received', () => {
    setup({
      user: mockUser,
      media: [],
      files: [],
      links: []
    })

    expect(screen.getByText('chat.sidebar.noMedia')).toBeInTheDocument()
    expect(screen.getByText('chat.sidebar.noFiles')).toBeInTheDocument()
    expect(screen.getByText('chat.sidebar.noLinks')).toBeInTheDocument()
  })
})

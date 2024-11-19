import React, { useState } from 'react'
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

  it('should render close button and call onClose on click', () => {
    const onCloseMock = vi.fn()

    setup({
      member: mockMember,
      links: [],
      onClose: onCloseMock
    })

    const closeButton = screen.getByTestId('close-icon')
    expect(closeButton).toBeInTheDocument()

    closeButton.click()
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  it('should render goBackBtn when titleText is not About ', () => {
    setup({
      member: mockMember,
      media: [],
      files: [],
      links: mockLinks,
      title: 'link'
    })

    const backButton = screen.getByTestId('back-icon')
    expect(backButton).toBeInTheDocument()
  })

  it('should render the user professional summary when provided', () => {
    const mockMemberWithSummary = {
      user: {
        ...mockUser,
        professionalSummary: 'Experienced web developer'
      },
      role: 'tutor'
    }

    setup({
      member: mockMemberWithSummary,
      links: []
    })

    const userDescription = screen.getByText('Experienced web developer')
    expect(userDescription).toBeInTheDocument()
  })

  it('should render the fallback text when professional summary is not provided', () => {
    const mockMemberWithoutSummary = {
      user: {
        ...mockUser,
        professionalSummary: ''
      },
      role: 'tutor'
    }

    setup({
      member: mockMemberWithoutSummary,
      links: []
    })

    const fallbackText = screen.getByText('chatPage.sidebar.noSummary')
    expect(fallbackText).toBeInTheDocument()
  })
})

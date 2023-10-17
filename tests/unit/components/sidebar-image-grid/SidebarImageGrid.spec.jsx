import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'

import someAvatar from '~/assets/img/tutor-profile-page/avatar.png'

const images = [
  {
    _id: 'm1',
    name: 'Cool pic',
    path: someAvatar,
    timestamp: new Date('2022-01-01T19:50:21.817Z')
  },
  {
    _id: 'm2',
    name: 'Awesome',
    path: someAvatar,
    timestamp: new Date('2022-01-01T19:50:21.817Z')
  },
  {
    _id: 'm3',
    name: 'Some avatar',
    path: someAvatar,
    timestamp: new Date('2022-01-01T19:50:21.817Z')
  },
  {
    _id: 'm4',
    name: 'Pretty neat media',
    path: someAvatar,
    timestamp: new Date('2023-01-01T19:50:21.817Z')
  }
]

it('renders the SidebarImageGrid component with images', () => {
  render(<SidebarImageGrid images={images} />)

  const firstImg = screen.getByAltText(images[0].name)
  const lastImg = screen.queryByAltText(images[images.length - 1].name)

  expect(firstImg).toBeInTheDocument()
  expect(lastImg).not.toBeInTheDocument()
})

it('renders the SidebarImageGrid component in compactMode', () => {
  render(<SidebarImageGrid images={images} />)

  const addIcon = screen.getByTestId('AddIcon')

  expect(addIcon).toBeInTheDocument()
})

it('renders the SidebarImageGrid component in non-compactMode', () => {
  render(<SidebarImageGrid compactMode={false} images={images} />)

  const lastImg = screen.getByAltText(images[images.length - 1].name)

  expect(lastImg).toBeInTheDocument()
})

import React from 'react'
import { render, getAllByRole } from '@testing-library/react'
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

test('renders the SidebarImageGrid component with images', () => {
  const { getByAltText } = render(<SidebarImageGrid images={images} />)

  expect(getByAltText(images[images.length - 1].name)).toBeInTheDocument()
})

test('renders the SidebarImageGrid component in compactMode', () => {
  const { getByText } = render(<SidebarImageGrid compactMode images={images} />)

  expect(getByText('+' + (images.length - 2))).toBeInTheDocument()
})

test('renders the SidebarImageGrid component in non-compactMode', () => {
  const { container } = render(
    <SidebarImageGrid compactMode={false} images={images} />
  )

  expect(getAllByRole(container, 'img')).toHaveLength(images.length)
})

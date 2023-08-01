import React from 'react'
import { render, getAllByRole } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import SidebarImageGrid from '~/components/sidebar-image-grid/SidebarImageGrid'

const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg']

test('renders the SidebarImageGrid component with images', () => {
  const { getByAltText } = render(<SidebarImageGrid images={images} />)

  expect(getByAltText(images[images.length - 1])).toBeInTheDocument()
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

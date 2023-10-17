import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import LinkComponent from '~/components/link-component/LinkComponent'

const linkData = {
  _id: '1',
  name: 'Example Link',
  url: 'https://www.example.com'
}

const mockOpen = (url, target, features) => {
  mockOpen.url = url
  mockOpen.target = target
  mockOpen.features = features
}

Object.defineProperty(window, 'open', { value: mockOpen })

beforeEach(() => {
  render(<LinkComponent link={linkData} />)
})

describe('LinkComponent', () => {
  it('renders link name and URL', () => {
    const linkName = screen.getByText(linkData.name)
    const linkUrl = screen.getByText(linkData.url)

    expect(linkName).toBeInTheDocument()
    expect(linkUrl).toBeInTheDocument()
  })

  it('opens link URL in a new tab when the button is clicked', () => {
    fireEvent.click(screen.getByText('Example Link'))

    expect(mockOpen.url).toBe('https://www.example.com')
    expect(mockOpen.target).toBe('_blank')
    expect(mockOpen.features).toBe('noopener noreferrer')
  })
})

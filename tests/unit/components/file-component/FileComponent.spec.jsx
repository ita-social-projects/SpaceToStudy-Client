import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import FileComponent from '~/components/file-component/FileComponent'

const sampleFile = {
  _id: '1',
  name: 'testfile.txt',
  size: '5',
  url: 'http://example.com/testfile.txt',
  createdAt: new Date('2023-07-31'),
  updatedAt: new Date('2023-07-31')
}

const mockOpen = (url, target, features) => {
  mockOpen.url = url
  mockOpen.target = target
  mockOpen.features = features
}

Object.defineProperty(window, 'open', { value: mockOpen })

beforeEach(() => {
  render(<FileComponent file={sampleFile} />)
})

it('renders file name and file details correctly', () => {
  expect(screen.getByText('testfile.txt')).toBeInTheDocument()
  expect(screen.getByText('5 chatPage.sidebar.megabytes')).toBeInTheDocument()
  expect(screen.getByText('July 31, 2023')).toBeInTheDocument()
})

it('clicking on the file opens the file URL in a new tab', () => {
  fireEvent.click(screen.getByText('testfile.txt'))

  expect(mockOpen.url).toBe('http://example.com/testfile.txt')
  expect(mockOpen.target).toBe('_blank')
  expect(mockOpen.features).toBe('noopener noreferrer')
})

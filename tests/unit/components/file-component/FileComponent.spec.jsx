import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import FileComponent from '~/components/file-component/FileComponent'

const sampleFile = {
  _id: '1',
  name: 'testfile.txt',
  size: '5',
  uploadedDate: new Date('2023-07-31'),
  url: 'http://example.com/testfile.txt'
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

test('renders file name and file details correctly', () => {
  expect(screen.getByText('testfile.txt')).toBeInTheDocument()
  expect(screen.getByText('5 MB')).toBeInTheDocument()
  expect(screen.getByText('31st July 2023')).toBeInTheDocument()
})

test('clicking on the file opens the file URL in a new tab', () => {
  fireEvent.click(screen.getByText('testfile.txt'))

  expect(mockOpen.url).toBe('http://example.com/testfile.txt')
  expect(mockOpen.target).toBe('_blank')
  expect(mockOpen.features).toBe('noopener noreferrer')
})

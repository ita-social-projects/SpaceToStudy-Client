import React from 'react'
import { render } from '@testing-library/react'
import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'

const MockIcon = () => <div>Mock Icon</div>

const content = [
  { _id: '1', name: 'Link 1', url: 'https://example.com/link1' },
  { _id: '2', name: 'Link 2', url: 'https://example.com/link2' },
  { _id: '3', name: 'Link 3', url: 'https://example.com/link3' }
]

const MockChildComponent1 = () => <div>Child Component 1</div>
const MockChildComponent2 = () => <div>Child Component 2</div>
const MockChildComponent3 = () => <div>Child Component 3</div>

test('renders SidebarContentBox with content', () => {
  const { getByText } = render(
    <SidebarContentBox Icon={MockIcon} content={content} name='Links'>
      <MockChildComponent1 />
      <MockChildComponent2 />
      <MockChildComponent3 />
    </SidebarContentBox>
  )

  expect(getByText('Links')).toBeInTheDocument()
  expect(getByText('Link 1')).toBeInTheDocument()
  expect(getByText('Link 2')).toBeInTheDocument()
  expect(getByText('Link 3')).toBeInTheDocument()
})

test('renders SidebarContentBox without content', () => {
  const { getByText } = render(
    <SidebarContentBox Icon={MockIcon} name='Links'>
      <MockChildComponent1 />
      <MockChildComponent2 />
      <MockChildComponent3 />
    </SidebarContentBox>
  )

  expect(getByText('Links')).toBeInTheDocument()
  expect(getByText('Child Component 1')).toBeInTheDocument()
  expect(getByText('Child Component 2')).toBeInTheDocument()
  expect(getByText('Child Component 3')).toBeInTheDocument()
})

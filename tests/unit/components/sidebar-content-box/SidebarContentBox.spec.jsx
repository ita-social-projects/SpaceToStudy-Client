import React from 'react'
import { render } from '@testing-library/react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'

const content = [
  { _id: '1', name: 'Link 1', url: 'https://example.com/link1' },
  { _id: '2', name: 'Link 2', url: 'https://example.com/link2' },
  { _id: '3', name: 'Link 3', url: 'https://example.com/link3' }
]

test('renders SidebarContentBox with content', () => {
  const { getByText } = render(
    <SidebarContentBox content={content} icon={ImageOutlinedIcon} name='Links'>
      <div>Child Component</div>
    </SidebarContentBox>
  )

  expect(getByText('Links')).toBeInTheDocument()
  expect(getByText('Link 1')).toBeInTheDocument()
  expect(getByText('Link 2')).toBeInTheDocument()
  expect(getByText('Link 3')).toBeInTheDocument()
})

test('renders SidebarContentBox without content', () => {
  const { getByText } = render(
    <SidebarContentBox icon={ImageOutlinedIcon} name='Links'>
      <div>Child Component</div>
    </SidebarContentBox>
  )

  expect(getByText('Links')).toBeInTheDocument()
  expect(getByText('Child Component')).toBeInTheDocument()
})

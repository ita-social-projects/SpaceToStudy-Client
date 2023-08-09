import React from 'react'
import { render, screen } from '@testing-library/react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

import SidebarContentBox from '~/components/sidebar-content-box/SidebarContentBox'
import { SidebarContentEnum } from '~/types'

const content = [
  { _id: '1', name: 'Link 1', url: 'https://example.com/link1' },
  { _id: '2', name: 'Link 2', url: 'https://example.com/link2' },
  { _id: '3', name: 'Link 3', url: 'https://example.com/link3' }
]
const { Links } = SidebarContentEnum

test('should render SidebarContentBox with links', () => {
  render(
    <SidebarContentBox
      content={content}
      icon={<ImageOutlinedIcon />}
      name={Links}
    />
  )

  const link = screen.getByText('https://example.com/link1')

  expect(link).toBeInTheDocument()
})

test('should render SidebarContentBox without content', () => {
  render(
    <SidebarContentBox content={[]} icon={<ImageOutlinedIcon />} name={Links} />
  )

  const noContentText = screen.getByText('chatPage.sidebar.noLinks')

  expect(noContentText).toBeInTheDocument()
})

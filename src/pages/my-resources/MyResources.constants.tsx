import { ReactElement } from 'react'

import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'

interface TabsData {
  [key: string]: {
    title: string
    icon: ReactElement
  }
}
export const tabsData: TabsData = {
  courses: {
    title: 'myResourcesPage.tabs.courses',
    icon: <TextSnippetOutlinedIcon />
  },
  lessons: {
    title: 'myResourcesPage.tabs.lessons',
    icon: <TextSnippetOutlinedIcon />
  },
  tests: {
    title: 'myResourcesPage.tabs.tests',
    icon: <BookOutlinedIcon />
  },
  attachments: {
    title: 'myResourcesPage.tabs.attachments',
    icon: <BookOutlinedIcon />
  }
}

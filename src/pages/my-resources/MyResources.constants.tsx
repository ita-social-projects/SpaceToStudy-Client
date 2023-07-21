import { ReactElement } from 'react'

import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFile'

interface TabsData {
  [key: string]: {
    title: string
    icon: ReactElement
  }
}
export const tabsData: TabsData = {
  lessons: {
    title: 'myResourcesPage.tabs.lessons',
    icon: <ArticleOutlinedIcon />
  },
  tests: {
    title: 'myResourcesPage.tabs.tests',
    icon: <NoteAltOutlinedIcon />
  },
  attachments: {
    title: 'myResourcesPage.tabs.attachments',
    icon: <AttachFileIcon />
  }
}

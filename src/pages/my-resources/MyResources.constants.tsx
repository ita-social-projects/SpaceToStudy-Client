import { ReactElement } from 'react'

import BookOutlinedIcon from '@mui/icons-material/BookOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'

interface ListDataMock {
  [key: string]: {
    title: string
    icon: ReactElement
  }
}
export const listDataMock: ListDataMock = {
  courses: {
    title: 'Courses',
    icon: <TextSnippetOutlinedIcon />
  },
  lessons: {
    title: 'Lessons',
    icon: <TextSnippetOutlinedIcon />
  },
  tests: {
    title: 'Tests',
    icon: <BookOutlinedIcon />
  },
  attachments: {
    title: 'Attachments',
    icon: <BookOutlinedIcon />
  }
}

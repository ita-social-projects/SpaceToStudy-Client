import { useState } from 'react'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { styles } from '~/pages/my-lessons/MyLessons.styles'

const listDataMock = [
  {
    id: 0,
    title: 'All lessons',
    items: [
      { id: 1, title: 'Item-1' },
      { id: 2, title: 'Item-2' },
      { id: 3, title: 'Item-3' }
    ]
  },
  {
    id: 1,
    title: 'Grouped lessons',
    items: [
      { id: 1, title: 'Item-11' },
      { id: 2, title: 'Item-22' },
      { id: 3, title: 'Item-33' }
    ]
  }
]

const MyLessons = () => {
  const [value, setValue] = useState<number>(0)

  const handleClick = (newValue: number) => {
    setValue(newValue)
  }

  const tabs = listDataMock.map((item) => (
    <Tab
      activeTab={value === item.id}
      key={item.id}
      onClick={() => handleClick(item.id)}
    >
      {item.title}
    </Tab>
  ))

  const itemsToDisplay = listDataMock[value].items.map((item) => (
    <Tab activeTab={false} key={item.id}>
      {item.title}
    </Tab>
  ))

  return (
    <PageWrapper>
      <Box sx={styles.wrapper}>
        <Box sx={styles.tabs}>{tabs}</Box>
        <Box sx={styles.items}>{itemsToDisplay}</Box>
      </Box>
    </PageWrapper>
  )
}

export default MyLessons

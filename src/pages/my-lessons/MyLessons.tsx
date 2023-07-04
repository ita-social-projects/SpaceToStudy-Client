import { useState } from 'react'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { styles } from '~/pages/my-lessons/MyLessons.styles'

const listDataMock = [
  {
    id: 0,
    title: 'All lessons',
    itemIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 1,
    title: 'Grouped lessons',
    itemIds: [1, 2, 3, 7]
  }
]

const listOfItemsDataMock = [
  { id: 1, title: 'Item-1' },
  { id: 2, title: 'Item-2' },
  { id: 3, title: 'Item-3' },
  { id: 4, title: 'Item-4' },
  { id: 5, title: 'Item-5' },
  { id: 6, title: 'Item-6' },
  { id: 7, title: 'Item-7' },
  { id: 8, title: 'Item-8' },
  { id: 9, title: 'Item-9' },
  { id: 10, title: 'Item-10' }
]

const MyLessons = () => {
  const [value, setValue] = useState<number>(0)

  const handleClick = (newValue: number) => {
    setValue(newValue)
  }

  const list = listDataMock.map((item) => (
    <Tab
      activeTab={value === item.id}
      key={item.id}
      onClick={() => handleClick(item.id)}
    >
      {item.title}
    </Tab>
  ))

  const listOfItems =
    value === 0
      ? listOfItemsDataMock.map((item) => (
          <Tab activeTab={false} key={item.id}>
            {item.title}
          </Tab>
        ))
      : listDataMock[value].itemIds.map((itemId) => {
          const item = listOfItemsDataMock.find((item) => item.id === itemId)
          return (
            <Tab activeTab={false} key={item?.id}>
              {item?.title}
            </Tab>
          )
        })

  return (
    <PageWrapper>
      <Box sx={styles.wrapper}>
        <Box sx={styles.list}>{list}</Box>
        <Box sx={styles.items}>{listOfItems}</Box>
      </Box>
    </PageWrapper>
  )
}
export default MyLessons

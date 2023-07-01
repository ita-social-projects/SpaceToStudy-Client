import { useState } from 'react'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { styles } from '~/pages/my-lessons/MyLessons.styles'

const groupedLessonsDataMock = [
  {
    id: 0,
    title: 'All',
    lessonIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 1,
    title: 'Lessons1',
    lessonIds: [1, 2, 3, 7]
  },
  {
    id: 2,
    title: 'Lessons2',
    lessonIds: [3, 4, 5]
  },
  {
    id: 3,
    title: 'Lessons3',
    lessonIds: [5, 1, 9, 10]
  }
]

const lessonsDataMock = [
  { id: 1, title: 'Lesson-1' },
  { id: 2, title: 'Lesson-2' },
  { id: 3, title: 'Lesson-3' },
  { id: 4, title: 'Lesson-4' },
  { id: 5, title: 'Lesson-5' },
  { id: 6, title: 'Lesson-6' },
  { id: 7, title: 'Lesson-7' },
  { id: 8, title: 'Lesson-8' },
  { id: 9, title: 'Lesson-9' },
  { id: 10, title: 'Lesson-10' }
]

const MyLessons = () => {
  const [value, setValue] = useState<number>(0)

  const handleClick = (newValue: number) => {
    setValue(newValue)
  }

  const groupedLessons = groupedLessonsDataMock.map((groupedLesson) => (
    <Tab
      activeTab={value === groupedLesson.id}
      key={groupedLesson.id}
      onClick={() => handleClick(groupedLesson.id)}
    >
      {groupedLesson.title}
    </Tab>
  ))

  const lessons =
    value === 0
      ? lessonsDataMock.map((lesson) => (
          <Tab activeTab={false} key={lesson.id}>
            {lesson.title}
          </Tab>
        ))
      : groupedLessonsDataMock[value].lessonIds.map((lessonId) => {
          const lesson = lessonsDataMock.find((item) => item.id === lessonId)
          return (
            <Tab activeTab={false} key={lesson?.id}>
              {lesson?.title}
            </Tab>
          )
        })

  return (
    <PageWrapper>
      <Box sx={styles.wrapper}>
        <Box sx={styles.groupedLessons}>{groupedLessons}</Box>
        <Box sx={styles.lessons}>{lessons}</Box>
      </Box>
    </PageWrapper>
  )
}
export default MyLessons

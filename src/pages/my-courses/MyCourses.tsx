import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'

import Tab from '~/components/tab/Tab'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

const coursesData = [
  {
    id: 1,
    title: 'Course1',
    lessons: [
      { id: 1, title: 'Lesson1' },
      { id: 2, title: 'Lesson2' },
      { id: 3, title: 'Lesson3' }
    ]
  },
  {
    id: 2,
    title: 'Course2',
    lessons: [
      { id: 1, title: 'Lesson4' },
      { id: 2, title: 'Lesson5' },
      { id: 3, title: 'Lesson6' }
    ]
  },
  {
    id: 3,
    title: 'Become an alcoholic',
    lessons: [
      { id: 1, title: 'Drink Beer' },
      { id: 2, title: 'Drink Whiskey' },
      { id: 3, title: 'Drink Vodka' },
      { id: 4, title: 'Code on C++' }
    ]
  }
]

const MyCourses = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const courses = coursesData.map((course) => (
    <Tab
      activeTab={value === course.id - 1}
      key={course.id}
      onClick={(event: React.SyntheticEvent) =>
        handleChange(event, course.id - 1)
      }
    >
      {course.title}
    </Tab>
  ))

  const lessons = coursesData[value].lessons.map((lesson) => (
    <Tab activeTab={false} key={lesson.id}>
      {lesson.title}
    </Tab>
  ))

  return (
    <PageWrapper>
      <Box sx={{ display: 'flex' }}>
        <Tabs
          onChange={handleChange}
          orientation='vertical'
          sx={{ borderRight: 1, borderColor: 'divider' }}
          value={value}
          variant='scrollable'
        >
          {courses}
        </Tabs>
        <Box sx={{ p: 3 }}>{lessons}</Box>
      </Box>
    </PageWrapper>
  )
}

export default MyCourses

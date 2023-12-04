import { FC } from 'react'
import { Box } from '@mui/material'

import CourseCard from '~/components/course-card/CourseCard'
import { styles } from '~/containers/my-courses/my-courses-container/MyCorsesCardsList.styles'

import { Course } from '~/types'

interface CourseListProps {
  items: Course[]
  deleteItem: (id: string) => void
}

const MyCorsesCardsList: FC<CourseListProps> = ({ items, deleteItem }) => {
  const courseItems = items.map((course) => (
    <Box key={course._id}>
      <CourseCard course={course} deleteCourse={deleteItem} />
    </Box>
  ))

  return <Box sx={styles.wrapper}>{courseItems}</Box>
}

export default MyCorsesCardsList

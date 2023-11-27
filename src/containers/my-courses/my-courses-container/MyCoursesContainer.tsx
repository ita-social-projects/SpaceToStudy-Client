import { FC } from 'react'
import { Box } from '@mui/material'

import CourseCard from '~/components/course-card/CourseCard'
import { styles } from '~/containers/my-courses/my-courses-container/MyCoursesContainer.styles'

import { CoursesContainerProps } from '~/types'

const MyCoursesContainer: FC<CoursesContainerProps> = ({ items }) => {
  return (
    <Box sx={styles.wrapper}>
      {items.map((course) => (
        <Box key={course._id}>
          <CourseCard course={course} />
        </Box>
      ))}
    </Box>
  )
}

export default MyCoursesContainer

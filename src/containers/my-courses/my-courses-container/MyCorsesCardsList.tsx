import { FC } from 'react'
import { Box } from '@mui/material'

import CourseCard from '~/components/course-card/CourseCard'
import { styles } from '~/containers/my-courses/my-courses-container/MyCorsesCardsList.styles'

import { MyCorsesListProps } from '~/types'

const MyCorsesCardsList: FC<MyCorsesListProps> = ({ items }) => {
  const courseItems = items.map((course) => (
    <Box key={course._id}>
      <CourseCard course={course} />
    </Box>
  ))

  return <Box sx={styles.wrapper}>{courseItems}</Box>
}

export default MyCorsesCardsList

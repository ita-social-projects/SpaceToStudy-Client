import { FC } from 'react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import CourseCard from '~/components/course-card/CourseCard'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/my-courses/my-courses-container/MyCorsesCardsList.styles'
import { Course } from '~/types'

interface CourseListProps {
  items: Course[]
  deleteItem?: (id: string) => void
  duplicateItem?: (id: string) => void
  withMenu?: boolean
  sx?: { [key: string]: SxProps | undefined }
  wrapperStyles?: SxProps
}

const MyCorsesCardsList: FC<CourseListProps> = ({
  items,
  deleteItem,
  duplicateItem,
  wrapperStyles,
  ...props
}) => {
  const courseItems = items.map((course) => (
    <Box key={course._id}>
      <CourseCard
        course={course}
        deleteCourse={deleteItem}
        duplicateCourse={duplicateItem}
        {...props}
      />
    </Box>
  ))

  return <Box sx={spliceSx(styles.wrapper, wrapperStyles)}>{courseItems}</Box>
}

export default MyCorsesCardsList

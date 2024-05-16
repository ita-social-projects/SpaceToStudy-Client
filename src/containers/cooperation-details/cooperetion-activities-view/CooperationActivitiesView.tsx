import { FC } from 'react'
import Box from '@mui/material/Box'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { CourseSection } from '~/types'

import { styles } from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.style'

interface CooperationActivitiesViewProps {
  sections: CourseSection[]
}

const CooperationActivitiesView: FC<CooperationActivitiesViewProps> = ({
  sections
}) => {
  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView id={item._id} item={item} key={item._id} />
      ))}
    </Box>
  )
}

export default CooperationActivitiesView

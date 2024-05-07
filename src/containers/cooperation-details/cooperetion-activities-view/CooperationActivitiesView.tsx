import { Box } from '@mui/material'

import CooperationSectionView from '~/components/cooperation-section-view/CooperationSectionView'
import { CourseSection } from '~/types'

import { styles } from '~/containers/cooperation-details/cooperetion-activities-view/CooperationActivitiesView.style'

interface CooperationActivitiesViewProps {
  sections: CourseSection[]
}

const CooperationActivitiesView = ({
  sections
}: CooperationActivitiesViewProps) => {
  return (
    <Box sx={styles.root}>
      {sections.map((item) => (
        <CooperationSectionView id={item._id} item={item} key={item._id} />
      ))}
    </Box>
  )
}

export default CooperationActivitiesView

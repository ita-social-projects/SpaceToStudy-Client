import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.rigthBox}>
        Subjects step
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep

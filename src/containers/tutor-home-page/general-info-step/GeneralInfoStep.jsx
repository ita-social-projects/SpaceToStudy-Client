import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      GeneralInfo step
      {btnsBox}
    </Box>
  )
}

export default GeneralInfoStep

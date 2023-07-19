import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const LanguageStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      Language step
      {btnsBox}
    </Box>
  )
}

export default LanguageStep

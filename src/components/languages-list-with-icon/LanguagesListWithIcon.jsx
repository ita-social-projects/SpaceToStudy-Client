import LanguageIcon from '@mui/icons-material/Language'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/languages-list-with-icon/LanguagesListWithIcon.styles'

const LanguagesListWithIcon = ({ languages }) => {
  const languageToShow = Array.isArray(languages)
    ? languages.join(', ')
    : languages

  return (
    <Box sx={styles.languagesContainer}>
      <LanguageIcon sx={styles.languageIcon} />
      <Typography sx={styles.languages}>{languageToShow}</Typography>
    </Box>
  )
}

export default LanguagesListWithIcon

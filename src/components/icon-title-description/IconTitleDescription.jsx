import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/icon-title-description/IconTitleDescription.styles'

const IconTitleDescription = ({ icon, title, description, sx = styles }) => {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.icon}>{icon}</Box>

      <TitleWithDescription
        description={description}
        style={sx.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconTitleDescription

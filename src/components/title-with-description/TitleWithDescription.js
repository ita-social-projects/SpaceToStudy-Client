import { Box, Typography } from '@mui/material'
import { titleWithDescriptionStyles as style } from '~/components/title-with-description/title-with-description.styles'
import { useTranslation } from 'react-i18next'

const TitleWithDescription = ({ title, description }) => {
  const { t } = useTranslation()

  return (
    <Box sx={ style.wrapper }>
      <Typography sx={ style.title }>
        { t(title) }
      </Typography>

      <Typography variant='subtitle1'>
        { t(description) }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription

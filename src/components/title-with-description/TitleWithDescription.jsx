import { Box, Typography } from '@mui/material'
import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

const TitleWithDescription = ({ title, description, style = styles }) => {
  return (
    <Box sx={style.wrapper}>
      <Typography sx={style.title}>{title}</Typography>
      <Typography component={'span'} sx={style.description}>
        {description}
      </Typography>
    </Box>
  )
}

export default TitleWithDescription

import { Box, Typography } from '@mui/material'
import { headingStyles as style } from '~/components/heading/heading.styles'

const Heading = ({ title, description }) => {
  return (
    <Box sx={ style.wrapper }>
      <Typography sx={ style.title }>
        { title }
      </Typography>

      <Typography sx={ style.description } variant='subtitle1'>
        { description }
      </Typography>
    </Box>
  )
}

export default Heading

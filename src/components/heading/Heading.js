import { Typography } from '@mui/material'
import { headingStyles as style } from '~/components/heading/heading.styles'

const Heading = ({ title, description }) => {
  return (
    <>
      <Typography sx={ style.title }>
        { title }
      </Typography>

      <Typography sx={ style.description } variant='subtitle1'>
        { description }
      </Typography>
    </>
  )
}

export default Heading

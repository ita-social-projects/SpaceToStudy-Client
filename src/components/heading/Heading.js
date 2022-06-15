import { Typography } from '@mui/material'
import { headingStyles as style } from '~/components/heading/heading.styles'

const Heading = ({ title, description }) => {
  return (
    <>
      <Typography data-testid='title' sx={ style.title }>
        { title }
      </Typography>

      <Typography data-testid='description' sx={ style.description } variant='subtitle1'>
        { description }
      </Typography>
    </>
  )
}

export default Heading

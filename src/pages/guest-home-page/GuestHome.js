import { Box } from '@mui/material'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'

const GuestHomePage = () => {
  
  return (
    <Box>
      <WelcomeBlock />
      <AccordionWithImage items={ descriptionTimes }  />
    </Box>
  )
}

export default GuestHomePage


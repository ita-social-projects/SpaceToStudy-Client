import { Box } from '@mui/material'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import Footer from '~/components/footer/Footer'

const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <WelcomeBlock />
      <FeatureBlock items={ descriptionTimes }  />
      <Footer />
    </Box>
  )
}

export default GuestHomePage

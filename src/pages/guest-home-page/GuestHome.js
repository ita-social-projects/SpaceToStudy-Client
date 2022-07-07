import { Box } from '@mui/material'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import Welcome from '~/containers/guest-home-page/Welcome'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import Footer from '~/containers/footer/Footer'

const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <Welcome />
      <FeatureBlock items={ descriptionTimes }  />
      <WhatCanYouDo />
      <Footer />
    </Box>
  )
}

export default GuestHomePage

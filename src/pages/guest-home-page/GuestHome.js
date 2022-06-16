import { Box } from '@mui/material'

import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import WhoWeAre from '~/containers/guest-home-page/WhoWeAre'
import Footer from '~/components/footer/Footer'

const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <Welcome />
      <FeatureBlock items={ descriptionTimes }  />
      <WhatCanYouDo />
      <WhoWeAre />
      <Footer />
    </Box>
  )
}

export default GuestHomePage

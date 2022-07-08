import { Box } from '@mui/material'

import Welcome from '~/containers/guest-home-page/welcome/Welcome'
import FeatureBlock from '~/containers/guest-home-page/feature/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/what-can-you-do/WhatCanYouDo'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import Footer from '~/containers/footer/Footer'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'

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

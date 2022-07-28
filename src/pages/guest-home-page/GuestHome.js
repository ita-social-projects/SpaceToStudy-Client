import { Box } from '@mui/material'

import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <Welcome />
      <FeatureBlock items={ descriptionTimes }  />
      <WhatCanYouDo />
      <HowItWorks />
      <WhoWeAre />
    </Box>
  )
}

export default GuestHomePage

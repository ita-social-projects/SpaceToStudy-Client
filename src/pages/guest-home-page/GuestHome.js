import { Box } from '@mui/material'

import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import Footer from '~/containers/footer/Footer'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'

const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <Welcome />
      <FeatureBlock items={ descriptionTimes }  />
      <WhatCanYouDo />
      <WhoWeAre />
      <ScrollToTop />
      <Footer />
    </Box>
  )
}

export default GuestHomePage

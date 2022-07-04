import { Box } from '@mui/material'

import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import WhoWeAre from '~/containers/guest-home-page/WhoWeAre'
import Footer from '~/components/footer/Footer'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'

const GuestHomePage = () => {
  
  return (
    <Box data-testid="guestHome">
      <Box  sx={ { margin: '0 auto', maxWidth: '1128px' } }>
        <Welcome />
        <FeatureBlock items={ descriptionTimes }  />
        <WhatCanYouDo />
        <WhoWeAre />
      </Box>
      <Footer />
    </Box>
  )
}

export default GuestHomePage

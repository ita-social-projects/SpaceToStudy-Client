import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import ExploreCategories from '~/containers/categories-page/explore-categories/ExploreCategories'
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'

const Categories = () => {
  return (
    <Box sx={ { backgroundColor: 'backgroundColor', flex: 1 } }>
      <Container sx={ { pt: 6 } } >
        <OfferRequestBlock />
        <ExploreCategories />
      </Container>
    </Box>
  )
}

export default Categories

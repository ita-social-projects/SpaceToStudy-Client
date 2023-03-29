import Container from '@mui/material/Container'

import ExploreCategories from '~/containers/categories-page/explore-categories/ExploreCategories'
import OfferRequestBlock from '~/containers/find-offer/OfferRequestBlock'

import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  return (
    <Container sx={ styles.container } >
      <OfferRequestBlock />
      <ExploreCategories />
    </Container>
  )
}

export default Categories

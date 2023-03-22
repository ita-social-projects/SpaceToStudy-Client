import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import ExploreCategories from '~/containers/categories-page/explore-categories/ExploreCategories'

const Categories = () => {
  return (
    <Box sx={ { backgroundColor: 'backgroundColor', flex: 1 } }>
      <Container>
        <ExploreCategories />
      </Container>
    </Box>
  )
}

export default Categories

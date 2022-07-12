import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import useShowMore from '~/hooks/use-show-more'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ServiceCard from '~/components/service-card/ServiceCard'

import { styles } from '~/containers/student-home-page/popular-categories/popluar-categories.styles'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'

const count = {
  desktop: 12,
  tablet: 12,
  mobile: 4
}

const step = {
  desktop: 6,
  tablet: 4,
  mobile: 4
}

//TODO Write test for this component

const PopularCategories = () => {
  const size = useBreakpoints()
  const { items: categoriesList, expandable, showMore } = useShowMore(categoriesListMock, count[size], step[size])
  const { t } = useTranslation()

  const categories = categoriesList.map(item => {
    return (
      <ServiceCard
        count={ item.count } img={ item.img } key={ item.id }
        link={ item.link } title={ item.title }
      />
    )
  })

  return (
    <Box className='section' sx={ { flexDirection: 'column' } }>
      <TitleWithDescription
        description={ t('studentHomePage.popularCategories.description') }
        descriptionStyles={ { typography: { sm: 'body1', xs: 'body2' } } }
        title={ t('studentHomePage.popularCategories.title') }
        titleStyles={ { typography: { sm: 'h4', xs: 'h5' } } }
      />

      <Box sx={ { ...styles.container } }>
        { categories }
      </Box>

      <Button onClick={ () => showMore() } sx={ { display: expandable ? 'block' : 'none' } } variant='tonal'>
        { t('studentHomePage.popularCategories.viewMore') }
      </Button>
    </Box>
  )
}

export default PopularCategories

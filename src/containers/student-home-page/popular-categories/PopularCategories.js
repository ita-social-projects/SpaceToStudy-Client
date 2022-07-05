import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ServiceCard from '~/components/service-card/ServiceCard'

import { styles } from '~/containers/student-home-page/popular-categories/popluar-categories.styles'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'
import useBreakpoints from '~/hooks/use-breakpoints'

const titleStyles = {
  typography: {
    sm: 'h4',
    xs: 'h5'
  }
}

const descriptionStyles = {
  typography: {
    sm: 'body1',
    xs: 'body2'
  }
}

//TODO Write test for this component

const PopularCategories = () => {
  const [expand, setExpand] = useState(false)
  const size = useBreakpoints()
  const { t } = useTranslation()

  let count

  switch (size) {
  case 'mobile':
    count =  4
    break
  case 'desktop':
  case 'tablet':
  default:
    count = 12
    break
  }

  const btnVisibility = categoriesListMock.length > count ? 'block' : 'none'
  const servicesList = expand ? categoriesListMock : categoriesListMock.slice(0, count)
  const categories = servicesList.map(item => {
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
        descriptionStyles={ descriptionStyles }
        title={ t('studentHomePage.popularCategories.title') }
        titleStyles={ titleStyles }
      />

      <Box sx={ { ...styles.container } }>
        { categories }
      </Box>

      <Button onClick={ () => setExpand(!expand) } sx={ { display: btnVisibility } } variant='tonal'>
        { t('studentHomePage.popularCategories.viewMore') }
      </Button>
    </Box>
  )
}

export default PopularCategories

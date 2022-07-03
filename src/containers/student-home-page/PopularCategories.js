import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ServiceCard from '~/components/service-card/ServiceCard'

import { categoriesList } from '~/constants/categories/categoriesList'

const titleVariant = {
  sm: 'h4',
  xs: 'h5'
}

const descriptionVariant = {
  sm: 'body1',
  xs: 'body2'
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: {
      md: 'repeat(3, 1fr)',
      sm: 'repeat(2, 1fr)'
    },
    gridAutoRows: '126px',
    gridGap: '24px',
    maxWidth: '1128px',
    mb: '32px',
    p: '24px',
    overflowY: 'hidden',
    transition: 'all ease 1s'
  }
}


const PopularCategories = () => {
  const [expand, setExpand] = useState(false)
  const { t } = useTranslation()

  const servicesExpand = expand ? { height: '718px', overflowY: 'scroll' } : { height: '568px' }

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
        descriptionVariant={ descriptionVariant }
        title={ t('studentHomePage.popularCategories.title') }
        titleVariant={ titleVariant }
      />

      <Box sx={ { ...styles.container, ...servicesExpand } }>
        { categories }
      </Box>

      <Button onClick={ () => setExpand(true) } variant='tonal'>
        { t('studentHomePage.popularCategories.viewMore') }
      </Button>
    </Box>
  )
}

export default PopularCategories

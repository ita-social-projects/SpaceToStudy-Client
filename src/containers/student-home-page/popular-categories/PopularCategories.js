import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import useShowMore from '~/hooks/use-show-more'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'

import { styles } from '~/containers/student-home-page/popular-categories/popular-categories.styles'

const itemsToShow = {
  desktop: 12,
  tablet: 12,
  mobile: 4
}

const itemsToAdd = {
  desktop: 6,
  tablet: 4,
  mobile: 4
}

const PopularCategories = () => {
  const navigate = useNavigate()
  const windowSize = useBreakpoints()
  const { t } = useTranslation()
  const {
    items: categoriesList,
    isExpandable,
    showMore
  } = useShowMore(categoriesListMock, itemsToShow[windowSize], itemsToAdd[windowSize])

  const categories = categoriesList.map((item) => {
    return (
      <ClickableCard
        action={ () => navigate(item.link) }
        description={ item.description }
        img={ item.img }
        key={ item.id }
        title={ item.title }
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

      <Button onClick={ showMore } sx={ { display: isExpandable ? 'block' : 'none' } } variant='tonal'>
        { t('studentHomePage.popularCategories.viewMore') }
      </Button>
    </Box>
  )
}

export default PopularCategories

import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import useBreakpoints from '~/hooks/use-breakpoints'
import useShowMore from '~/hooks/use-show-more'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/popular-categories/popular-categories.styles'

const sectionId = studentRoutes.navBar.categories.route

const PopularCategories = () => {
  const navigate = useNavigate()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const itemsToShow = (isDesktop && 12) || (isTablet && 12) || (isMobile && 4)
  const itemsToAdd = (isDesktop && 6) || (isTablet && 4) || (isMobile && 4)
  const { items: categoriesList, isExpandable, showMore } = useShowMore(categoriesListMock, itemsToShow, itemsToAdd)

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
    <Box className='section' id={ sectionId } sx={ { flexDirection: 'column', alignItems: 'stretch' } }>
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

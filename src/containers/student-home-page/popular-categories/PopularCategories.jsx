import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import ClickableCard from '~/components/clickable-card/ClickableCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import serviceIcon from '~/assets/img/student-home-page/service_icon.png'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'
import { studentRoutes } from '~/router/constants/studentRoutes'

const sectionId = studentRoutes.navBar.categories.route

const PopularCategories = () => {
  const { t } = useTranslation()

  const cards = categoriesListMock.slice(0, 6).map((item) => {
    return (
      <ClickableCard
        description={ `${item.totalOffers} ${t('categoriesPage.offers')}` }
        img={ serviceIcon }
        key={ item._id }
        title={ item.name }
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
      
      <ClickableCardList
        btnText={ t('studentHomePage.popularCategories.viewMore') }
        cards={ cards }
        isExpandable
      />
    </Box>
  )
}

export default PopularCategories

import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'
import { studentRoutes } from '~/router/constants/studentRoutes'

const sectionId = studentRoutes.navBar.categories.route

const PopularCategories = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()

  const itemsToShow = (isDesktop && 6) || (isTablet && 6) || (isMobile && 4)
  const itemsToAdd = (isDesktop && 6) || (isTablet && 4) || (isMobile && 4)

  return (
    <Box
      className='section'
      id={sectionId}
      sx={{ flexDirection: 'column', alignItems: 'stretch' }}
    >
      <TitleWithDescription
        description={t('studentHomePage.popularCategories.description')}
        descriptionStyles={{ typography: { sm: 'body1', xs: 'body2' } }}
        title={t('studentHomePage.popularCategories.title')}
        titleStyles={{ typography: { sm: 'h4', xs: 'h5' } }}
      />

      <ClickableCardList
        allItems={categoriesListMock}
        btnText={t('studentHomePage.popularCategories.viewMore')}
        itemsToAdd={itemsToAdd}
        itemsToShow={itemsToShow}
      />
    </Box>
  )
}

export default PopularCategories

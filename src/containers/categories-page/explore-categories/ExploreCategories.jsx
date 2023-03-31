import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import useBreakpoints from '~/hooks/use-breakpoints'
import HashLink from '~/components/hash-link/HashLink'
import ClickableCardList from '~/components/clickable-card-list/ClickableCardList'
import SearchWithFilters from '~/components/search-with-filters/SearchWithFilters'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { guestRoutes} from '~/router/constants/guestRoutes'
import { categoriesListMock } from '~/containers/student-home-page/popular-categories/categories-list-mock'
import { styles } from '~/containers/categories-page/explore-categories/ExploreCategories.styles'

const ExploreCategories = () => {
  const { t } = useTranslation()
  const { isDesktop, isTablet, isMobile } = useBreakpoints()
  const [searchValue, setSearchValue] = useState('')

  const itemsToShow = (isDesktop && 15) || (isTablet && 6) || (isMobile && 4)
  const itemsToAdd = (isDesktop && 6) || (isTablet && 4) || (isMobile && 4)

  const { path } = guestRoutes.findOffers
  return (
    <Box className='section' sx={ styles.container }>
      <TitleWithDescription
        description={ t('categoriesPage.categories.description') }
        descriptionStyles={ styles.sectionDescription }
        title={ t('categoriesPage.categories.title') }
        titleStyles={ styles.sectionTitle }
      />

      <Typography
        component={ HashLink }
        sx={ styles.showAllOffers }
        to={ path }
        variant='button'
      >
        { t('categoriesPage.categories.showAllOffers') } 
        <ArrowForwardIcon fontSize='small' />
      </Typography>

      <SearchWithFilters
        label={ t('categoriesPage.categories.searchLabel') } options={ categoriesListMock } search={ searchValue }
        setSearch={ setSearchValue }
      />

      <ClickableCardList
        allItems={ categoriesListMock }
        btnText={ t('categoriesPage.categories.viewMore') }
        itemsToAdd={ itemsToAdd }
        itemsToShow={ itemsToShow }
      />
    </Box>
  )
}

export default ExploreCategories

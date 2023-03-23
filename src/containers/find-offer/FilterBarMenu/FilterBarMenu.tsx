import { FC, useState } from 'react'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import FiltersTitle from '~/components/filters-title/FiltersTitle'

// TODO: FILTER imports
import { styles } from '~/containers/find-offer/FilterBarMenu/FilterBarMenu.styles'
import { useTranslation } from 'react-i18next'


// TODO:ADD text from i18 not HARDCODED !!!!!

interface BarMenuFilters {
  activeOffersType: boolean
  sortBy: string
  view: 'inline' | 'grid'
}

interface FilterBarMenuProps {
  chosenFiltersQty:number,
  openFilters: () => void,
  getFilters: (filters: BarMenuFilters) => void
}

const FilterBarMenu: FC<FilterBarMenuProps> = ({ chosenFiltersQty, openFilters, getFilters }) => {
  const [barMenuFilters, setBarMenuFilters] = useState<BarMenuFilters>({
    activeOffersType: false,
    sortBy: 'newest',
    view: 'inline'
  })

  const { isDesktop, isMobile } = useBreakpoints()

  const { t } = useTranslation()

  const handleOffersType = (_: any, activeOffersType: boolean) => {
    setBarMenuFilters((filters) => {
      const updatedFilters = {
        ...filters,
        activeOffersType
      }
      getFilters(updatedFilters)

      return updatedFilters
    })
  }

  const handleSortBy = (sortBy: string) => {
    setBarMenuFilters((filters) => {
      const updatedFilters = { ...filters, sortBy }
      getFilters(updatedFilters)

      return updatedFilters
    })
  }

  const handleCardView = (view: 'grid' | 'inline') => {
    setBarMenuFilters((filters) => {
      const updatedFilters = { ...filters, view }
      getFilters(updatedFilters)

      return updatedFilters
    })
  }

  return (
    <Box sx={ isMobile ? styles.mobileContainer : styles.container } >
      <FiltersTitle chosenFiltersQty={ chosenFiltersQty } handleOpenFilters={ openFilters } />
      { isDesktop ? (
        <AppContentSwitcher
          active={ barMenuFilters.activeOffersType }
          handleChange={ handleOffersType }
          styles={ {} }
          switchOptions={ switcherOptions }
          typographyVariant='h6'
        />
      ) : null }
      { !isMobile ? (
        <Box sx={ styles.rightContainer }>
          <AppSelect
            fields={ sortByFields }
            placingStyles={ isDesktop ? styles.selectContainer : {} }
            selectTitle={ t('filters.sortBy.sortByTitle') }
            setValue={ handleSortBy }
            value={ barMenuFilters.sortBy }
          />
          { isDesktop ? <ViewSwitcher offersView={ barMenuFilters.view } setOffersView={ handleCardView } /> : null }
        </Box>
      ) : null } 
    </Box>
  )
}

export default FilterBarMenu

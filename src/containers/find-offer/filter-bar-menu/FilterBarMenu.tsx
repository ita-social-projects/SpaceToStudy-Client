import { FC, useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import FiltersTitle from '~/components/filters-title/FiltersTitle'

import { styles } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.styles'
import { sortByFields, initialBarMenuFilters } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.constants'

import { BarMenuFilters, CardsViewTypes } from '~/types'


interface FilterBarMenuProps {
  chosenFiltersQty:number,
  openFilters: () => void,
  getFilters: (filters: BarMenuFilters) => void,
  handleOffersView:(view: CardsViewTypes) => void,
  offersView: CardsViewTypes
}

const FilterBarMenu: FC<FilterBarMenuProps> = ({ chosenFiltersQty, openFilters, getFilters, handleOffersView, offersView }) => {
  const [barMenuFilters, setBarMenuFilters] = useState<BarMenuFilters>(initialBarMenuFilters)

  const { isDesktop, isMobile } = useBreakpoints()

  const { t } = useTranslation()
  
  const translatedSwitcherOptions = {
    left:{
      text:t('findOffers.topMenu.tutorsOffers'),
      tooltip:t('findOffers.contentSwitcher.switcher-tutor')
    },
    right:{
      text:t('findOffers.topMenu.studentsRequests'),
      tooltip:t('findOffers.contentSwitcher.switcher-student')
    }
  }
  
  const handleOffersType = (event: ChangeEvent<HTMLInputElement>, isActiveOffersType: boolean) => {
    setBarMenuFilters((filters) => {
      const updatedFilters = {
        ...filters,
        isActiveOffersType
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
  
  return (
    <Box sx={ isMobile ? styles.mobileContainer : { ...styles.container, marginTop:'100px', marginBottom:'100px' } } >
      <FiltersTitle chosenFiltersQty={ chosenFiltersQty } handleOpenFilters={ openFilters } />
      { isDesktop ? (
        <AppContentSwitcher
          active={ barMenuFilters.isActiveOffersType }
          handleChange={ handleOffersType }
          switchOptions={ translatedSwitcherOptions }
          typographyVariant='h6'
        />
      ) : null }
      { !isMobile ? (
        <Box sx={ styles.container }>
          <AppSelect
            fields={ sortByFields }
            selectTitle={ t('filters.sortBy.sortByTitle') }
            setValue={ handleSortBy }
            sx={ isDesktop ? styles.selectContainer : {} }
            value={ barMenuFilters.sortBy }
          />
          { isDesktop ? <ViewSwitcher offersView={ offersView } setOffersView={ handleOffersView } /> : null }
        </Box>
      ) : null } 
    </Box>
  )
}

export default FilterBarMenu

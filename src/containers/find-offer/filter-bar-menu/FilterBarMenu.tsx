import { FC, useState, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import useBreakpoints from '~/hooks/use-breakpoints'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import ViewSwitcher from '~/components/view-switcher/ViewSwitcher'
import FiltersTitle from '~/components/filters-title/FiltersTitle'

import { styles } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.styles'
import { switcherOptions, sortByFields, initialBarMenuFilters } from '~/containers/find-offer/filter-bar-menu/FilterBarMenu.constants'

import { BarMenuFilters, CardsViewTypes } from '~/types'


interface FilterBarMenuProps {
  chosenFiltersQty:number,
  openFilters: () => void,
  getFilters: (filters: BarMenuFilters) => void
}

const FilterBarMenu: FC<FilterBarMenuProps> = ({ chosenFiltersQty, openFilters, getFilters }) => {
  const [barMenuFilters, setBarMenuFilters] = useState<BarMenuFilters>(initialBarMenuFilters)

  const { isDesktop, isMobile } = useBreakpoints()

  const { t } = useTranslation()
  
  const translatedSwitcherOptions = {
    left:{
      text:t(switcherOptions.left.text),
      tooltip:t(switcherOptions.left.tooltip)
    },
    right:{
      text:t(switcherOptions.right.text),
      tooltip:t(switcherOptions.right.tooltip)
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

  const handleCardView = (view: CardsViewTypes) => {
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
          active={ barMenuFilters.isActiveOffersType }
          handleChange={ handleOffersType }
          styles={ {} }
          switchOptions={ translatedSwitcherOptions }
          typographyVariant='h6'
        />
      ) : null }
      { !isMobile ? (
        <Box sx={ styles.rightContainer }>
          <AppSelect
            fields={ sortByFields }
            selectTitle={ t('filters.sortBy.sortByTitle') }
            setValue={ handleSortBy }
            sx={ isDesktop ? styles.selectContainer : {} }
            value={ barMenuFilters.sortBy }
          />
          { isDesktop ? <ViewSwitcher offersView={ barMenuFilters.view } setOffersView={ handleCardView } /> : null }
        </Box>
      ) : null } 
    </Box>
  )
}

export default FilterBarMenu

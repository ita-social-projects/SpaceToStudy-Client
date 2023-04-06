import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import AppButton from '~/components/app-button/AppButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import OfferFilterList from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  FindOfferFilterTypes,
  FindOffersFilters,
  FindOffersFiltersActions
} from '~/types'

import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.styles'

interface OfferFilterBlockProps {
  filters: FindOffersFilters
  filterActions: FindOffersFiltersActions
  showingTutorOffers: boolean
  onToggleTutorOffers: () => void
  closeFilters: () => void
  open: boolean
  countActiveFilters: number
}

const OfferFilterBlock: FC<OfferFilterBlockProps> = ({
  filters,
  filterActions,
  showingTutorOffers,
  onToggleTutorOffers,
  countActiveFilters,
  closeFilters,
  open
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { updateFilter, resetFilters, updateQueryParams } = filterActions

  const switchOptions = {
    left: {
      text: showingTutorOffers
        ? t('findOffers.topMenu.tutorsOffers')
        : t('findOffers.topMenu.studentsRequests')
    }
  }
  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const updateFilterByKey = (key: string) => (value: FindOfferFilterTypes) =>
    updateFilter(value, key)
  const handleApplyFilters = () => {
    updateQueryParams()
    isMobile && closeFilters()
  }

  const mobileFields = isMobile && (
    <>
      <FiltersToggle chosenFiltersQty={countActiveFilters} />
      <Divider />
      <AppContentSwitcher
        active={showingTutorOffers}
        onChange={onToggleTutorOffers}
        styles={styles.switchWrapper}
        switchOptions={switchOptions}
        typographyVariant={'subtitle2'}
      />
      <AppSelect
        fields={sortOptions}
        fullWidth
        selectTitle={t('common.labels.sortBy')}
        setValue={updateFilterByKey('sort')}
        size='small'
        sx={styles.selectWrapper}
        value={filters.sort}
      />
    </>
  )

  const filtersBlock = (
    <Stack spacing={2} sx={styles.root(open)}>
      {mobileFields}
      <OfferFilterList
        filters={filters}
        updateFilter={updateFilter}
        updateFilterByKey={updateFilterByKey}
      />
      <AppButton onClick={handleApplyFilters} sx={styles.applyButton}>
        {t('button.applyFilters')}
      </AppButton>
      <AppButton onClick={resetFilters} variant='tonal'>
        {t('button.clearFilters')}
      </AppButton>
    </Stack>
  )

  return isMobile ? (
    <AppDrawer onClose={closeFilters} open={open}>
      {filtersBlock}
    </AppDrawer>
  ) : (
    filtersBlock
  )
}

export default OfferFilterBlock

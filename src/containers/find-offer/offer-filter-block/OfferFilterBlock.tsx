import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'

import AppButton from '~/components/app-button/AppButton'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import AppSelect from '~/components/app-select/AppSelect'
import OfferFilterList from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList'
import FiltersToggle from '~/components/filters-toggle/FiltersToggle'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  FindOffersFilters,
  FindOffersFiltersActions,
  PriceRange,
  UserRoleEnum
} from '~/types'

import { sortTranslationKeys } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/OfferFilterBlock.styles'

interface OfferFilterBlockProps {
  filters: FindOffersFilters
  filterActions: FindOffersFiltersActions<FindOffersFilters>
  onToggleTutorOffers: () => void
  closeFilters: () => void
  additionalParams: Record<string, unknown>
  open: boolean
  activeFilterCount?: number
  price: PriceRange
}

const OfferFilterBlock: FC<OfferFilterBlockProps> = ({
  filters,
  filterActions,
  onToggleTutorOffers,
  activeFilterCount,
  closeFilters,
  additionalParams,
  open,
  price
}) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()
  const { updateFiltersInQuery, resetFilters, updateQueryParams } =
    filterActions
  const showingTutorOffers = filters.authorRole === UserRoleEnum.Student

  const switchOptions = {
    left: {
      text: showingTutorOffers
        ? t('findOffers.topMenu.studentsRequests')
        : t('findOffers.topMenu.tutorsOffers')
    }
  }
  const sortOptions = sortTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const updateFilterByKey =
    <K extends keyof FindOffersFilters>(key: K) =>
    (value: FindOffersFilters[K]) => {
      updateFiltersInQuery({ [key]: value })
    }

  const handleApplyFilters = () => {
    updateQueryParams()
    updateFiltersInQuery(additionalParams)
    closeFilters()
  }

  const mobileFields = !isLaptopAndAbove && (
    <>
      <FiltersToggle chosenFiltersQty={activeFilterCount} />
      <Divider />
      <AppContentSwitcher
        active={showingTutorOffers}
        onChange={onToggleTutorOffers}
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

  return (
    <Stack spacing={2} sx={styles.root(open)}>
      {mobileFields}
      <OfferFilterList
        filters={filters}
        price={price}
        updateFilterByKey={updateFilterByKey}
        updateFiltersInQuery={updateFiltersInQuery}
      />
      <AppButton onClick={handleApplyFilters} sx={styles.applyButton}>
        {t('button.applyFilters')}
      </AppButton>
      <AppButton onClick={resetFilters} variant='tonal'>
        {t('button.clearFilters')}
      </AppButton>
    </Stack>
  )
}

export default OfferFilterBlock

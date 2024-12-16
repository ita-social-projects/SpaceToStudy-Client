import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppRange from '~/components/app-range/AppRange'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import FilterInput from '~/components/filter-input/FilterInput'
import RadioButtonInputs from '~/components/radio-button-inputs/RadioButtonInputs'

import { useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import {
  languageValues,
  radioButtonsTranslationKeys
} from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.styles'
import {
  FindOffersFilters,
  LanguageFilter,
  LanguagesEnum,
  PriceRange,
  ProficiencyLevelEnum,
  UpdateFiltersInQuery,
  UpdateOfferFilterByKey,
  UserRoleEnum
} from '~/types'

interface OfferFilterListProps {
  filters: FindOffersFilters
  updateFilterByKey: UpdateOfferFilterByKey
  updateFiltersInQuery: UpdateFiltersInQuery<FindOffersFilters>
  price: PriceRange
}

const OfferFilterList: FC<OfferFilterListProps> = ({
  updateFiltersInQuery,
  updateFilterByKey,
  filters,
  price
}) => {
  const { isLaptopAndAbove } = useBreakpoints()
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const levelOptions = Object.values(ProficiencyLevelEnum)

  const radioOptions = radioButtonsTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const handleLanguagesChange = (
    _: SyntheticEvent<Element, Event>,
    value: string | null
  ) => updateFiltersInQuery({ language: value as LanguagesEnum | null })

  const handleChecked = (_: SyntheticEvent<Element, Event>, checked: boolean) =>
    updateFiltersInQuery({ native: checked.toString() })

  const handleFilterChange = (key: keyof FindOffersFilters) => () =>
    updateFilterByKey(key)

  const getOptionLabelForLanguage = (option: LanguageFilter | null): string => {
    return option?.trim() ? option : t('common.languages.allLanguages')
  }

  const languagesFilter = (
    <Box>
      <AppAutoComplete
        getOptionLabel={getOptionLabelForLanguage}
        onChange={handleLanguagesChange}
        options={languageValues}
        value={filters.language}
      />
      <FormControlLabel
        checked={Boolean(JSON.parse(filters.native))}
        control={<Checkbox />}
        label={
          <Typography variant='body2'>
            {t('findOffers.filterTitles.nativeSpeaker')}
          </Typography>
        }
        onChange={handleChecked}
        sx={styles.checkbox}
      />
    </Box>
  )

  const filterTitle = (title: string) => (
    <Typography sx={styles.title}>{title}</Typography>
  )

  const checkboxListProps =
    userRole === UserRoleEnum.Tutor
      ? { fillRange: true }
      : { singleSelect: true }

  return (
    <>
      {filterTitle(t('findOffers.filterTitles.level'))}
      <CheckboxList
        {...checkboxListProps}
        items={levelOptions}
        onChange={handleFilterChange('proficiencyLevel')}
        value={filters.proficiencyLevel}
        variant={'body2'}
      />
      {filterTitle(t('findOffers.filterTitles.language'))}
      {languagesFilter}
      {filterTitle(t('findOffers.filterTitles.price'))}
      <AppRange
        max={price.maxPrice}
        min={price.minPrice}
        onChange={updateFilterByKey('price')}
        value={filters.price}
      />
      {filterTitle(t('findOffers.filterTitles.rating'))}
      <RadioButtonInputs
        items={radioOptions}
        onChange={handleFilterChange('rating')}
        value={Number(filters.rating)}
      />
      {!isLaptopAndAbove && (
        <>
          {filterTitle(t('findOffers.filterTitles.search'))}
          <FilterInput
            onChange={updateFilterByKey('search')}
            value={filters.search || ''}
          />
        </>
      )}
    </>
  )
}

export default OfferFilterList

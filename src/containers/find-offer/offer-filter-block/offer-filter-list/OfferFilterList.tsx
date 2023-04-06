import { FC, MouseEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppRange from '~/components/app-range/AppRange'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import FilterInput from '~/components/filter-input/FilterInput'
import RadioButtonInputs from '~/components/radio-button-inputs/RadioButtonInputs'

import {
  languagesTranslationKeys,
  levelsTranslationKeys,
  radioButtonsTranslationKeys
} from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.styles'
import {
  FindOfferFilterTypes,
  FindOffersFilters,
  FindOffersUpdateFilter
} from '~/types'

interface OfferFilterListProps {
  filters: FindOffersFilters
  updateFilterByKey: (key: string) => (value: FindOfferFilterTypes) => void
  updateFilter: FindOffersUpdateFilter
}

const OfferFilterList: FC<OfferFilterListProps> = ({
  updateFilter,
  updateFilterByKey,
  filters
}) => {
  const { t } = useTranslation()

  const languageOptions = languagesTranslationKeys.map((language) =>
    t(language)
  )
  const levelOptions = levelsTranslationKeys.map((radio) => t(radio))
  const radioOptions = radioButtonsTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const handleLanguagesChange = (
    _: MouseEvent<HTMLLIElement>,
    value: string | null
  ) => value && updateFilter(value, 'language')
  const handleChecked = (_: SyntheticEvent<Element, Event>, checked: boolean) =>
    updateFilter(checked.toString(), 'native')

  const languagesFilter = (
    <Box>
      <AppAutoComplete
        fieldValue={filters.language}
        onChange={handleLanguagesChange}
        options={languageOptions}
        size='small'
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

  return (
    <>
      {filterTitle(t('findOffers.filterTitles.level'))}
      <CheckboxList
        items={levelOptions}
        onChange={updateFilterByKey('level')}
        value={filters.level}
        variant={'body2'}
      />
      {filterTitle(t('findOffers.filterTitles.language'))}
      {languagesFilter}
      {filterTitle(t('findOffers.filterTitles.price'))}
      <AppRange
        max={550}
        min={150}
        onChange={updateFilterByKey('price')}
        value={filters.price}
      />
      {filterTitle(t('findOffers.filterTitles.rating'))}
      <RadioButtonInputs
        items={radioOptions}
        onChange={updateFilterByKey('rating')}
        value={Number(filters.rating)}
      />
      {filterTitle(t('findOffers.filterTitles.search'))}
      <FilterInput
        onChange={updateFilterByKey('name')}
        value={filters.name || ''}
      />
    </>
  )
}

export default OfferFilterList

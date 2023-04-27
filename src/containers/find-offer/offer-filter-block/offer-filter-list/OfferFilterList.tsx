import { FC, MouseEvent, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppRange from '~/components/app-range/AppRange'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import FilterInput from '~/components/filter-input/FilterInput'
import RadioButtonInputs from '~/components/radio-button-inputs/RadioButtonInputs'

import {
  languageValues,
  defaultResponse,
  radioButtonsTranslationKeys
} from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.constants'
import { styles } from '~/containers/find-offer/offer-filter-block/offer-filter-list/OfferFilterList.styles'
import {
  FindOffersFilters,
  FindOffersUpdateFilter,
  LanguageFilter,
  LanguagesEnum,
  ProficiencyLevelEnums,
  UpdateOfferFilterByKey
} from '~/types'
import useAxios from '~/hooks/use-axios'
import { OfferService } from '~/services/offer-service'

interface OfferFilterListProps {
  filters: FindOffersFilters
  updateFilterByKey: UpdateOfferFilterByKey
  updateFilter: FindOffersUpdateFilter<FindOffersFilters>
}

const OfferFilterList: FC<OfferFilterListProps> = ({
  updateFilter,
  updateFilterByKey,
  filters
}) => {
  const { t } = useTranslation()
  const levelOptions = Object.values(ProficiencyLevelEnums)

  const radioOptions = radioButtonsTranslationKeys.map(({ title, value }) => ({
    title: t(title),
    value
  }))

  const getPricaRange = useCallback(
    () => OfferService.getPriceRange({ authorRole: filters.authorRole }),
    [filters.authorRole]
  )

  const { response, fetchData } = useAxios({
    service: getPricaRange,
    fetchOnMount: false,
    defaultResponse
  })

  useEffect(() => {
    void fetchData()
  }, [fetchData])

  const handleLanguagesChange = (
    _: MouseEvent<HTMLLIElement>,
    value: LanguagesEnum | null
  ) => updateFilter(value || '', 'language')

  const handleChecked = (_: SyntheticEvent<Element, Event>, checked: boolean) =>
    updateFilter(checked.toString(), 'native')

  const languagesFilter = (
    <Box>
      <AppAutoComplete
        getOptionLabel={(option: LanguageFilter) =>
          option || t('common.languages.allLanguages')
        }
        onChange={handleLanguagesChange}
        options={languageValues}
        textFieldProps={{
          id: t('findOffers.filterTitles.language')
        }}
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
        max={response.maxPrice}
        min={response.minPrice}
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

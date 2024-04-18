import { SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterOptionsState, createFilterOptions } from '@mui/material'

import { LocationService } from '~/services/location-service'
import useAxios from '~/hooks/use-axios'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'

import { defaultResponses } from '~/constants'
import { Country, EditProfileForm } from '~/types'

interface LocationSelectionInputsProps<T> {
  onDataChange: (key: keyof T, value: string | null) => void
  data: T
}

const LocationSelectionInputs = <
  T extends Pick<EditProfileForm, 'country' | 'city'>
>({
  onDataChange,
  data
}: LocationSelectionInputsProps<T>) => {
  const { t } = useTranslation()

  const getCountries = useCallback(() => LocationService.getCountries(), [])
  const getCities = useCallback(
    (country?: string) => LocationService.getCities(country ?? ''),
    []
  )

  const {
    loading: loadingCountries,
    response: countries,
    fetchData: fetchCountries
  } = useAxios<Country[]>({
    service: getCountries,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

  const countriesNames = countries.map((country) => country.name)

  const {
    loading: loadingCities,
    fetchData: fetchCities,
    response: cities
  } = useAxios<string[], string>({
    service: getCities,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

  useEffect(() => {
    if (countries.length && data.city && !cities.length) {
      const country = countries.find((country) => country.name === data.country)
      country && void fetchCities(country.iso2)
    }
  }, [data.country, data.city, countries, cities.length, fetchCities])

  const onChangeCountry = async (_: SyntheticEvent, value: string | null) => {
    if (data.country !== value) {
      onDataChange('city', null)
      onDataChange('country', value)
    }

    if (value) {
      const selectedCountry = countries.find(
        (country) => country.name === value
      )

      if (selectedCountry) {
        await fetchCities(selectedCountry.iso2)
      }
    }
  }

  const onChangeCity = (_: SyntheticEvent, value: string | null) => {
    onDataChange('city', value)
  }

  const onFocusCountry = !countries.length ? fetchCountries : undefined

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<unknown>
  ) => {
    const defaultFilterOptions = createFilterOptions()
    return defaultFilterOptions(options, state).slice(0, 100)
  }

  return (
    <>
      <AppAutoComplete
        fullWidth
        loading={loadingCountries}
        onChange={onChangeCountry}
        onFocus={onFocusCountry}
        options={countriesNames}
        sx={{ mb: '25px' }}
        textFieldProps={{
          label: t('common.labels.country')
        }}
        value={data.country}
      />

      <AppAutoComplete
        disabled={!data.country}
        filterOptions={filterOptions}
        fullWidth
        loading={loadingCities}
        onChange={onChangeCity}
        onFocus={onFocusCountry}
        options={cities}
        sx={{ mb: '25px' }}
        textFieldProps={{
          label: t('common.labels.city')
        }}
        value={data.city}
      />
    </>
  )
}

export default LocationSelectionInputs

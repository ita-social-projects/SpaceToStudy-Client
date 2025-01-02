import { SyntheticEvent, useCallback, useEffect, useMemo } from 'react'
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

  const {
    loading: loadingCountries,
    response: countries,
    fetchData: fetchCountries
  } = useAxios<Country[]>({
    service: LocationService.getCountries,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

  const {
    loading: loadingCities,
    fetchData: fetchCities,
    response: cities
  } = useAxios<string[], string>({
    service: LocationService.getCities,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array
  })

  const hasCountries = countries.length > 0
  const hasCities = cities.length > 0

  useEffect(() => {
    if (hasCountries && !hasCities && data.city) {
      const countryByName = countries.find(
        (country) => country.name === data.country
      )

      if (countryByName) {
        void fetchCities(countryByName.iso2)
      }
    }
  }, [countries, data, fetchCities, hasCountries, hasCities])

  const handleCountryChange = (
    _: SyntheticEvent,
    countryName: string | null
  ) => {
    if (data.country !== countryName) {
      onDataChange('city', null)
      onDataChange('country', countryName)
    }

    if (!countryName) {
      return
    }

    const countryByName = countries.find(
      (country) => country.name === countryName
    )

    if (countryByName) {
      void fetchCities(countryByName.iso2)
    }
  }

  const handleCityChange = (_: SyntheticEvent, cityName: string | null) => {
    onDataChange('city', cityName)
  }

  const handleSelectorFocus = useCallback(() => {
    if (!hasCountries) {
      void fetchCountries()
    }
  }, [fetchCountries, hasCountries])

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const defaultFilterOptions = createFilterOptions<string>()

    return defaultFilterOptions(options, state).slice(0, 100)
  }

  const countriesNames = useMemo(() => {
    return countries.map((country) => country.name)
  }, [countries])

  return (
    <>
      <AppAutoComplete
        fullWidth
        loading={loadingCountries}
        onChange={handleCountryChange}
        onFocus={handleSelectorFocus}
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
        onChange={handleCityChange}
        onFocus={handleSelectorFocus}
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

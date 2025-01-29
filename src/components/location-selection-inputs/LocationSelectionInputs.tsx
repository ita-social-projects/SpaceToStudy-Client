import {
  type FilterOptionsState,
  type SxProps,
  createFilterOptions
} from '@mui/material'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { defaultResponses } from '~/constants'
import useQuery from '~/hooks/use-query'
import { locationService } from '~/services/location-service'
import { type EditProfileForm } from '~/types'

interface LocationSelectionInputsProps {
  onDataChange: (key: 'country' | 'city', value: string | null) => void
  data: Pick<EditProfileForm, 'country' | 'city'>
  sx?: SxProps
}

const LocationSelectionInputs: React.FC<LocationSelectionInputsProps> = ({
  onDataChange,
  data,
  sx
}) => {
  const { t } = useTranslation()

  const {
    data: countries = defaultResponses.array,
    isLoading: isLoadingCountries
  } = useQuery({
    queryFn: locationService.getCountries,
    queryKey: ['countries'],
    options: {
      staleTime: Infinity
    }
  })

  const handleGetCities = useCallback(async () => {
    const countryByName = countries.find(
      (country) => country.name === data.country
    )

    if (countryByName) {
      return await locationService.getCitiesByCountryName(countryByName.iso2)
    }

    return defaultResponses.array
  }, [countries, data.country])

  const { data: cities = defaultResponses.array, isLoading: isLoadingCities } =
    useQuery({
      queryFn: handleGetCities,
      queryKey: ['cities', data.country, countries.length],
      options: {
        staleTime: Infinity
      }
    })

  const handleCountryChange = (
    _: React.SyntheticEvent,
    countryName: string | null
  ) => {
    if (data.country !== countryName) {
      onDataChange('city', null)
      onDataChange('country', countryName)
    }
  }

  const handleCityChange = (
    _: React.SyntheticEvent,
    cityName: string | null
  ) => {
    onDataChange('city', cityName)
  }

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
        loading={isLoadingCountries}
        onChange={handleCountryChange}
        options={countriesNames}
        sx={sx}
        textFieldProps={{
          label: t('common.labels.country')
        }}
        value={data.country}
      />
      <AppAutoComplete
        disabled={!data.country}
        filterOptions={filterOptions}
        fullWidth
        loading={isLoadingCities}
        onChange={handleCityChange}
        options={cities}
        sx={sx}
        textFieldProps={{
          label: t('common.labels.city')
        }}
        value={data.city}
      />
    </>
  )
}

export default LocationSelectionInputs

import { createFilterOptions, FilterOptionsState } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  type ReactNode,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useMemo
} from 'react'
import { useTranslation } from 'react-i18next'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import Loader from '~/components/loader/Loader'
import { validations } from '~/components/user-steps-wrapper/constants'
import { defaultResponses } from '~/constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useStepContext } from '~/context/step-context'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import useForm from '~/hooks/use-form'
import useQuery from '~/hooks/use-query'
import { useAppSelector } from '~/hooks/use-redux'
import { locationService } from '~/services/location-service'
import { userService } from '~/services/user-service'
import { type UserGeneralInfo, type UserRole } from '~/types'

interface GeneralInfoStepProps {
  btnsBox: ReactNode
  isUserFetched: boolean
  setIsUserFetched: (isUserFetched: boolean) => void
}

type UserName = { firstName: string; lastName: string }

const GeneralInfoStep = ({
  btnsBox,
  isUserFetched,
  setIsUserFetched
}: GeneralInfoStepProps) => {
  const { t } = useTranslation()
  const { isLaptopAndAbove, isMobile } = useBreakpoints()
  const { stepData, handleGeneralInfo } = useStepContext()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const generalInfo = stepData.generalInfo

  const {
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm<UserGeneralInfo>({
    initialValues: generalInfo.data,
    initialErrors: {
      city: generalInfo.errors['city'] ?? '',
      country: generalInfo.errors['country'] ?? '',
      firstName: generalInfo.errors['firstName'] ?? '',
      lastName: generalInfo.errors['lastName'] ?? '',
      professionalSummary: generalInfo.errors['professionalSummary'] ?? ''
    },
    ...validations
  })

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
    _: SyntheticEvent,
    countryName: string | null
  ) => {
    if (data.country !== countryName) {
      handleNonInputValueChange('city', null)
      handleNonInputValueChange('country', countryName)
    }
  }

  const handleCityChange = (_: SyntheticEvent, cityName: string | null) => {
    handleNonInputValueChange('city', cityName)
  }

  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const defaultFilterOptions = createFilterOptions<string>()

    return defaultFilterOptions(options, state).slice(0, 300)
  }

  const countriesNames = useMemo(() => {
    return countries.map((country) => country.name)
  }, [countries])

  const getUserById = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const updateUserName = useCallback(
    (user: UserName) => {
      handleNonInputValueChange('firstName', user.firstName)
      handleNonInputValueChange('lastName', user.lastName)

      setIsUserFetched(true)
    },
    [handleNonInputValueChange, setIsUserFetched]
  )

  const { loading: userLoading, fetchData: fetchUser } = useAxios({
    service: getUserById,
    defaultResponse: { firstName: '', lastName: '' },
    fetchOnMount: false,
    onResponse: updateUserName
  })

  useEffect(() => {
    !isUserFetched && void fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleGeneralInfo({ data, errors })
  }, [data, errors, handleGeneralInfo])

  if (userLoading) {
    return (
      <Box sx={styles.container}>
        <Loader />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box component='form' sx={styles.form}>
        <Box>
          <Typography mb='20px'>
            {t('becomeTutor.generalInfo.title')}
          </Typography>
          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}
          <Box sx={styles.formFieldsContainer}>
            <AppTextField
              autoFocus
              errorMsg={t(errors.firstName)}
              fullWidth
              label={t('common.labels.firstName')}
              onBlur={handleBlur('firstName')}
              onChange={handleInputChange('firstName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.firstName}
            />
            <AppTextField
              errorMsg={t(errors.lastName)}
              fullWidth
              label={t('common.labels.lastName')}
              onBlur={handleBlur('lastName')}
              onChange={handleInputChange('lastName')}
              required
              sx={{ mb: '5px' }}
              type='text'
              value={data.lastName}
            />
            <AppAutoComplete
              loading={isLoadingCountries}
              onChange={handleCountryChange}
              options={countriesNames}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.country')
              }}
              value={data.country}
            />
            <AppAutoComplete
              disabled={!data.country}
              filterOptions={filterOptions}
              loading={isLoadingCities}
              onChange={handleCityChange}
              options={cities}
              sx={{ mb: '30px' }}
              textFieldProps={{
                label: t('common.labels.city')
              }}
              value={data.city}
            />
          </Box>
          <AppTextArea
            fullWidth
            label={t('becomeTutor.generalInfo.textFieldLabel')}
            maxLength={200}
            onChange={handleInputChange('professionalSummary')}
            type='text'
            value={data.professionalSummary}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep

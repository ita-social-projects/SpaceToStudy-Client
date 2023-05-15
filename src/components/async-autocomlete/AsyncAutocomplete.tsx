import { useEffect, useMemo } from 'react'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useAxios, { UseAxiosProps } from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { ServiceFunction } from '~/types'

interface AsyncAutocompleteProps<T, F extends boolean | undefined>
  extends Omit<
    AutocompleteProps<T, undefined, undefined, F>,
    'value' | 'options' | 'renderInput'
  > {
  service: ServiceFunction<T[]>
  valueField?: keyof T
  labelField?: keyof T
  value: T[keyof T] | null
  textFieldProps?: TextFieldProps
  axiosProps: Pick<UseAxiosProps<T[]>, 'onResponse' | 'onResponseError'>
}

const AsyncAutocomplete = <T, F extends boolean | undefined = undefined>({
  textFieldProps,
  valueField,
  labelField,
  value,
  service,
  axiosProps,
  ...props
}: AsyncAutocompleteProps<T, F>) => {
  const { loading, response, fetchData } = useAxios<T[]>({
    service,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array,
    ...axiosProps
  })

  useEffect(() => {
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])

  const valueOption = useMemo(
    () =>
      response.find(
        (option) => (valueField ? option[valueField] : option) === value
      ) || null,
    [response, value, valueField]
  )

  const getOptionLabel = useMemo(
    () => (option: T) => (labelField ? option[labelField] : option) || '',
    [labelField]
  )

  const isOptionEqualToValue = (option: T, value: T) => {
    if (valueField) {
      return option?.[valueField] === value?.[valueField]
    }
    return option === value
  }

  return (
    <AppAutoComplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      options={response}
      textFieldProps={textFieldProps}
      value={valueOption}
      {...props}
    />
  )
}

export default AsyncAutocomplete

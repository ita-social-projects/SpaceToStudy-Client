import { useEffect, useMemo } from 'react'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'

const AsyncAutocomplete = ({
  fetchOnFocus,
  fetchCondition,
  textFieldProps,
  valueField,
  labelField,
  value,
  service,
  axiosProps,
  ...props
}) => {
  const { loading, response, fetchData } = useAxios({
    service,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array,
    ...axiosProps
  })

  useEffect(() => {
    !fetchOnFocus && (fetchCondition ?? true) && void fetchData()
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
    () => (option) => (labelField ? option[labelField] : option) || '',
    [labelField]
  )

  const isOptionEqualToValue = (option, value) => {
    if (valueField) {
      return option?.[valueField] === value?.[valueField]
    }
    return option === value
  }

  const handleFocus = () => {
    const fetchFocusCondition = fetchCondition ?? !response.length
    fetchOnFocus && fetchFocusCondition && void fetchData()
  }

  return (
    <AppAutoComplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      onFocus={handleFocus}
      options={response}
      textFieldProps={textFieldProps}
      value={valueOption}
      {...props}
    />
  )
}

export default AsyncAutocomplete

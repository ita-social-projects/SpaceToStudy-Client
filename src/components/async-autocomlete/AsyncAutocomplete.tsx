import { useEffect, useMemo } from 'react'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useAxios, { UseAxiosProps } from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { ServiceFunction, Category } from '~/types'

export interface AsyncAutocompleteProps<
  Response,
  Params,
  TransformedResponse,
  F extends boolean | undefined
> extends Omit<
    AutocompleteProps<TransformedResponse, undefined, undefined, F>,
    'value' | 'options' | 'renderInput'
  > {
  service: ServiceFunction<Response[], Params>
  valueField?: keyof TransformedResponse
  labelField?: keyof TransformedResponse
  value: TransformedResponse[keyof TransformedResponse] | null | Category
  fetchCondition?: boolean
  textFieldProps?: TextFieldProps
  fetchOnFocus?: boolean
  axiosProps?: Pick<
    UseAxiosProps<Response[], Params, TransformedResponse[]>,
    'onResponse' | 'onResponseError' | 'transform'
  >
}

const AsyncAutocomplete = <
  Response,
  Params = undefined,
  TransformedResponse = Response,
  F extends boolean | undefined = undefined
>({
  fetchOnFocus,
  fetchCondition,
  textFieldProps,
  valueField,
  labelField,
  value,
  service,
  axiosProps,
  ...props
}: AsyncAutocompleteProps<Response, Params, TransformedResponse, F>) => {
  const { loading, response, fetchData } = useAxios<
    Response[],
    Params,
    TransformedResponse[]
  >({
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
    () => (option: TransformedResponse) =>
      (labelField ? option[labelField] : option) || '',
    [labelField]
  )

  const isOptionEqualToValue = (
    option: TransformedResponse,
    value: TransformedResponse
  ) => {
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

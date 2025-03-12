import { useEffect, useMemo } from 'react'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useQuery from '~/hooks/use-query'
import { Category, ServiceFunctionNew } from '~/types'
import { ResponseError } from '~/exceptions'

export interface AsyncAutocompleteProps<
  Response,
  TransformedResponse,
  F extends boolean | undefined
> extends Omit<
    AutocompleteProps<TransformedResponse, undefined, undefined, F>,
    'value' | 'options' | 'renderInput'
  > {
  service: ServiceFunctionNew<Response[]>
  valueField?: keyof TransformedResponse
  labelField?: keyof TransformedResponse
  value: TransformedResponse[keyof TransformedResponse] | null | Category
  queryOptions: Record<string, unknown>
  fetchCondition?: boolean
  textFieldProps?: TextFieldProps
  fetchOnFocus?: boolean
  transform?: (params: Response[]) => TransformedResponse[]
  onResponse?: (responseData: TransformedResponse[]) => Promise<void> | void
  onResponseError?: (error: ResponseError) => void
}

const AsyncAutocomplete = <
  Response,
  TransformedResponse = Response,
  F extends boolean | undefined = undefined
>({
  fetchOnFocus,
  fetchCondition,
  textFieldProps,
  valueField,
  labelField,
  value,
  queryOptions,
  service,
  transform,
  onResponse,
  onResponseError,
  ...props
}: AsyncAutocompleteProps<Response, TransformedResponse, F>) => {
  const {
    isLoading: loading,
    data: response,
    error,
    refetch: fetchData
  } = useQuery({
    queryFn: service,
    queryKey: ['async-autocomplete', queryOptions],
    options: {
      staleTime: Infinity,
      select: transform
    }
  })

  useEffect(() => {
    if (response && onResponse) {
      void onResponse(response)
    }
  }, [response, onResponse])

  useEffect(() => {
    if (error && onResponseError) {
      onResponseError(error)
    }
  }, [error, onResponseError])

  const valueOption = useMemo(
    () =>
      response?.find(
        (option) => (valueField ? option[valueField] : option) === value
      ) ?? null,
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
    const fetchFocusCondition = fetchCondition ?? !response?.length
    fetchOnFocus && fetchFocusCondition && void fetchData()
  }

  return (
    <AppAutoComplete
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      onFocus={handleFocus}
      options={response as TransformedResponse[]}
      textFieldProps={textFieldProps}
      value={valueOption}
      {...props}
    />
  )
}

export default AsyncAutocomplete

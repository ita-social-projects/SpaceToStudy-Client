import { useEffect, useMemo } from 'react'
import { AutocompleteProps } from '@mui/material/Autocomplete'
import { TextFieldProps } from '@mui/material/TextField'

import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import useQuery from '~/hooks/use-query'
import { UseAxiosProps } from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { Category, ServiceFunctionNew, ErrorResponse } from '~/types'

type QueryLabel = 'categories' | 'resources-categories' | 'subjects'

interface QueryOptions {
  type: QueryLabel
  categoryId?: string
}

export interface AsyncAutocompleteProps<
  Response,
  Params,
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
  queryOptions: QueryOptions
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
  queryOptions,
  service,
  axiosProps,
  ...props
}: AsyncAutocompleteProps<Response, Params, TransformedResponse, F>) => {
  const {
    isLoading: loading,
    data: response,
    error,
    refetch: fetchData
  } = useQuery({
    queryFn: async () => {
      const result = await service()
      const transformed = axiosProps?.transform
        ? axiosProps.transform(result)
        : result
      return transformed
    },
    queryKey: ['async-autocomplete', queryOptions, axiosProps?.transform],
    options: {
      initialData: defaultResponses.array
    }
  })

  useEffect(() => {
    !fetchOnFocus && (fetchCondition ?? true) && void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service])

  useEffect(() => {
    if (response && axiosProps?.onResponse) {
      void axiosProps.onResponse(response as TransformedResponse[])
    }
  }, [response, axiosProps])

  useEffect(() => {
    if (error && axiosProps?.onResponseError) {
      axiosProps.onResponseError(error as ErrorResponse)
    }
  }, [error, axiosProps])

  const valueOption = useMemo(
    () =>
      response.find(
        (option) =>
          (valueField
            ? (option as TransformedResponse)[valueField]
            : option) === value
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
    const fetchFocusCondition = fetchCondition ?? !response.length
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

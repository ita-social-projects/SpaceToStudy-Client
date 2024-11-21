import React, { Fragment, SyntheticEvent, useState } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import Autocomplete, {
  createFilterOptions,
  AutocompleteProps
} from '@mui/material/Autocomplete'
import { FilterOptionsState } from '@mui/base'
import { ChipTypeMap } from '@mui/material/Chip'
import Loader from '~/components/loader/Loader'

const defaultFilterOptions = <T,>(
  options: T[],
  state: FilterOptionsState<T>
) => {
  const filterOptions = createFilterOptions<T>()
  return filterOptions(options, state)
}

type CustomProps<T> = {
  textFieldProps?: TextFieldProps & { helperText?: string; error?: boolean }
  hideClearIcon?: boolean
  onChange?: (_: SyntheticEvent, value: string | null) => void | Promise<void>
  onFocus?: (_: SyntheticEvent, value: string | null) => void | Promise<void>
  required?: boolean
} & Omit<T, 'renderInput'>

const AppAutoComplete = <
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>({
  filterOptions = defaultFilterOptions<Value>,
  ListboxProps = { style: { maxHeight: 150 } },
  options = [],
  hideClearIcon = false,
  textFieldProps = {},
  required = false,
  ...props
}: CustomProps<
  AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
>) => {
  const [error, setError] = useState(false)

  const handleBlur = () => {
    if (required && !props.value) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option === value}
      options={options}
      {...props}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputProps={{
            ...params.InputProps,
            ...textFieldProps.InputProps,
            endAdornment: (
              <Fragment>
                {props.loading ? (
                  <Loader size={20} sx={{ color: 'primary.600' }} />
                ) : null}
                {!hideClearIcon && params.InputProps.endAdornment}
              </Fragment>
            )
          }}
          error={error || textFieldProps.error}
          helperText={
            (error && 'This field is required') || textFieldProps.helperText
          }
        />
      )}
    />
  )
}

export default AppAutoComplete

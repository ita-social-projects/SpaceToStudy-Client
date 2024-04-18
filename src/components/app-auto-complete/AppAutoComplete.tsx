import { Fragment, SyntheticEvent } from 'react'

import TextField, { TextFieldProps } from '@mui/material/TextField'
import Autocomplete, {
  createFilterOptions,
  AutocompleteProps
} from '@mui/material/Autocomplete'

import Loader from '~/components/loader/Loader'
import { ChipTypeMap, FilterOptionsState } from '@mui/material'

const defaultFilterOptions = <T,>(
  options: T[],
  state: FilterOptionsState<T>
) => {
  const filterOptions = createFilterOptions<T>()
  return filterOptions(options, state)
}

type CustomProps<T> = {
  textFieldProps?: TextFieldProps
  hideClearIcon?: boolean
  onChange?: (_: SyntheticEvent, value: string | null) => void | Promise<void>
  onFocus?: (_: SyntheticEvent, value: string | null) => void | Promise<void>
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
  ...props
}: CustomProps<
  AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
>) => {
  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option === value}
      options={options}
      {...props}
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
        />
      )}
    />
  )
}

export default AppAutoComplete

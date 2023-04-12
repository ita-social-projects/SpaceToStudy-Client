import { Fragment } from 'react'

import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import Loader from '~/components/loader/Loader'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const AppAutoComplete = ({
  disabled = false,
  freeSolo = false,
  fieldValue,
  filterOptions = defaultFilterOptions,
  ListboxProps = { style: { maxHeight: 150 } },
  loading = false,
  onChange,
  onInputChange,
  options,
  ...props
}) => {
  return (
    <Autocomplete
      ListboxProps={ListboxProps}
      disabled={disabled}
      filterOptions={filterOptions}
      freeSolo={freeSolo}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) => option === value}
      loading={loading}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options || []}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          InputProps={{
            ...params.InputProps,
            ...props.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <Loader size={20} sx={{ color: 'primary.600' }} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
      sx={{ flex: 1 }}
      value={fieldValue}
    />
  )
}

export default AppAutoComplete

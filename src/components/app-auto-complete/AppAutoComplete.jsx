import { Fragment } from 'react'

import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import Loader from '../loader/Loader'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const AppAutoComplete = ({
  disabled = false,
  fieldValue,
  filterOptions = defaultFilterOptions,
  loading = false,
  onChange,
  options,
  ...props
}) => {
  return (
    <Autocomplete
      ListboxProps={ { style: { maxHeight: 150 } } }
      disabled={ disabled }
      filterOptions={ filterOptions }
      getOptionLabel={ (option) => option }
      isOptionEqualToValue={ (option, value) => option === value || value === '' }
      loading={ loading }
      onChange={ onChange }
      options={ options || [] }
      renderInput={ (params) => (
        <TextField
          { ...params }
          InputProps={ {
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                { loading ? <Loader size={ 20 } sx={ { color: 'primary.600' } } /> : null }
                { params.InputProps.endAdornment }
              </Fragment>
            )
          } }
          { ...props }
        />
      ) }
      value={ fieldValue }
    />
  )
}

export default AppAutoComplete

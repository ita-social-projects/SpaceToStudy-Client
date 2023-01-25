import { useState, useEffect, Fragment } from 'react'

import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import Loader from '../loader/Loader'

const defaultFilterOptions = (options, state) => {
  const filterOptions = createFilterOptions()
  return filterOptions(options, state)
}

const AppAutoComplete = ({
  disableOption = false,
  fieldName,
  fieldValue,
  filterOptions = defaultFilterOptions,
  label,
  propOptions,
  setFieldValue,
  styles,
  textFieldType = 'text'
}) => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
  const [options, setOptions] = useState([])

  const loading = open && options.length === 0

  const onChange = (_event, value) => setFieldValue(`${fieldName}`, value || null)

  useEffect(() => {
    setActive(true)

    if (!loading) {
      return
    }

    if (active && propOptions) {
      setOptions([...propOptions])
    }

    return () => {
      setActive(false)
    }
  }, [loading, propOptions, active])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      ListboxProps={ { style: { maxHeight: 150 } } }
      disabled={ disableOption }
      filterOptions={ filterOptions }
      getOptionLabel={ (option) => option }
      isOptionEqualToValue={ (option, value) => option === value }
      loading={ loading }
      onChange={ onChange }
      onClose={ () => setOpen(false) }
      onOpen={ () => setOpen(true) }
      open={ open }
      options={ options }
      renderInput={ (params) => (
        <TextField
          { ...params }
          InputProps={ {
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                { loading ? <Loader size={ 20 } /> : null }
                { params.InputProps.endAdornment }
              </Fragment>
            )
          } }
          fullWidth
          label={ label }
          sx={ styles }
          type={ textFieldType }
          value={ fieldValue }
        />
      ) }
      value={ fieldValue }
    />
  )
}

export default AppAutoComplete

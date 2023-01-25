import { Autocomplete } from '@mui/material'
import AppTextField from '~/components/app-text-field/AppTextField'

const Autocoplete = ({ id, onChange, value, options, label, ...props }) => {
  return (
    <Autocomplete
      ListboxProps={ { style: { maxHeight: '150px' } } }
      data-testid='autocomplete-search'
      getOptionLabel={ (option) => `${option.name}` }
      id={ id }
      isOptionEqualToValue={ (option, value) => option === value }
      noOptionsText={ 'Nothing found' }
      onChange={ onChange }
      options={ options }
      renderInput={ (params) => <AppTextField { ...params } label={ label } /> }
      value={ value }
      { ...props }
    />
  )
}

export default Autocoplete

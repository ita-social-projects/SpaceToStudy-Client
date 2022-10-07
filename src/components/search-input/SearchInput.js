import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import { styles } from './SearchInput.styles'

const SearchInput = ({ search, setSearch }) => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState(search)

  return (
    <TextField
      InputLabelProps={ {
        shrink: false
      } }
      InputProps={ {
        startAdornment: (
          <IconButton
            onClick={ () => {
              setSearch(searchInput)
            } }
          >
            <SearchIcon color='primary' />
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            className={ searchInput ? 'visible' : 'hidden' }
            onClick={ () => {
              setSearch('')
              setSearchInput('')
            } }
          >
            <ClearIcon color='secondary' />
          </IconButton>
        ),
        autoComplete: 'off'
      } }
      label={ !searchInput ? t('common.search') : '' }
      onChange={ (e) => setSearchInput(e.target.value) }
      onKeyPress={ (e) => {
        if (e.key === 'Enter') {
          setSearch(searchInput)
        }
      } }
      sx={ styles.input }
      value={ searchInput }
      variant='standard'
    />
  )
}

export default SearchInput

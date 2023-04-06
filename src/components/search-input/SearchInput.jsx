import { useState } from 'react'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'

import { styles } from './SearchInput.styles'

const SearchInput = ({ search, setSearch }) => {
  const [searchInput, setSearchInput] = useState(search)

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <IconButton
            data-testid='search-icon'
            onClick={() => {
              setSearch(searchInput)
            }}
          >
            <SearchIcon color='primary' />
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            className={search ? 'visible' : 'hidden'}
            data-testid='delete-icon'
            onClick={() => {
              setSearch('')
            }}
          >
            <ClearIcon color='secondary' />
          </IconButton>
        ),
        autoComplete: 'off'
      }}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          setSearch(searchInput)
        }
      }}
      sx={styles.input}
      value={searchInput}
      variant='standard'
    />
  )
}

export default SearchInput

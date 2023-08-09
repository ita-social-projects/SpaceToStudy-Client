import { useState } from 'react'
import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'

import { styles } from '~/components/search-by-message/SearchByMessage.styles'

const SearchByMessage = () => {
  const [search, setSearch] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClear = () => {
    setSearch('')
  }

  const placeholder = {
    placeholder: 'Search...'
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.iconBox}>
        <IconButton>
          <KeyboardArrowUpIcon />
        </IconButton>
        <p>0 of 0</p>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </Box>
      <InputWithIcon
        onChange={onChange}
        onClear={onClear}
        sx={styles.input}
        value={search}
        {...placeholder}
      />
    </Box>
  )
}

export default SearchByMessage

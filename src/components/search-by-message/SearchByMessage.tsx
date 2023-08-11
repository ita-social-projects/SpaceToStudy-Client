import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import IconsWithCounter from '../icons-with-counter/IconsWithCounter'

import { Box } from '@mui/system'

import { styles } from '~/components/search-by-message/SearchByMessage.styles'

const SearchByMessage = () => {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClear = () => {
    setSearch('')
  }

  return (
    <Box sx={styles.container}>
      <IconsWithCounter />
      <InputWithIcon
        onChange={onChange}
        onClear={onClear}
        sx={styles.input}
        value={search}
        {...{ placeholder: t('common.search') + '...' }}
      />
    </Box>
  )
}

export default SearchByMessage

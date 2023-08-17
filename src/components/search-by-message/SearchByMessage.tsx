import { useState, ChangeEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import IconsWithCounter from '~/components/icons-with-counter/IconsWithCounter'

import { styles } from '~/components/search-by-message/SearchByMessage.styles'

interface SearchByMessageProps {
  maxValue: number
}

const SearchByMessage: FC<SearchByMessageProps> = ({ maxValue }) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClear = () => {
    setSearch('')
  }

  return (
    <Box sx={styles.container}>
      <IconsWithCounter maxValue={maxValue} />
      <InputWithIcon
        onChange={onChange}
        onClear={onClear}
        placeholder={`${t('common.search')}...`}
        sx={styles.input}
        value={search}
      />
    </Box>
  )
}

export default SearchByMessage

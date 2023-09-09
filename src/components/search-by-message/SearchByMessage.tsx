import { useState, ChangeEvent, useEffect, FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import IconsWithCounter from '~/components/icons-with-counter/IconsWithCounter'
import { useDebounce } from '~/hooks/use-debounce'

import { styles } from '~/components/search-by-message/SearchByMessage.styles'

interface SearchByMessageProps {
  messages: { text: string }[]
  onFilteredMessagesChange: (filteredMessages: string[]) => void
  onFilteredIndexChange: (filteredIndex: number) => void
  isCloseSearch: () => void
}

const SearchByMessage: FC<SearchByMessageProps> = ({
  messages,
  onFilteredMessagesChange,
  onFilteredIndexChange,
  isCloseSearch
}) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [findMessage, setFindMessage] = useState<string[]>([])

  const debouncedOnFilteredMessagesChange = useDebounce(
    (filteredMessages: string[]) => {
      onFilteredMessagesChange(filteredMessages)
    },
    500
  )
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }
  useEffect(() => {
    if (search) {
      const filtered = messages.filter((message) =>
        message.text.toLowerCase().includes(search.toLowerCase())
      )
      const filteredMessages = filtered.map((item) => item.text)

      debouncedOnFilteredMessagesChange(filteredMessages)
      setFindMessage(filteredMessages)
    } else {
      onFilteredMessagesChange([])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, messages])

  const onClose = () => {
    setSearch('')
    isCloseSearch()
    onFilteredMessagesChange([])
  }
  return (
    <Box onClick={(e) => e.stopPropagation()} sx={styles.container}>
      <IconsWithCounter
        maxValue={findMessage.length}
        onFilteredIndexChange={onFilteredIndexChange}
      />
      <InputWithIcon
        onChange={onChange}
        onClear={onClose}
        placeholder={`${t('common.search')}...`}
        sx={styles.input}
        value={search}
      />
    </Box>
  )
}

export default SearchByMessage

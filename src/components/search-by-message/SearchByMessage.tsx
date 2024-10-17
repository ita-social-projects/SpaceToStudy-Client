import {
  useState,
  ChangeEvent,
  useEffect,
  FC,
  SetStateAction,
  Dispatch
} from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'
import IconsWithCounter from '~/components/icons-with-counter/IconsWithCounter'
import { useDebounce } from '~/hooks/use-debounce'

import { styles } from '~/components/search-by-message/SearchByMessage.styles'
import { MessageInterface } from '~/types'

interface SearchByMessageProps {
  onFilteredMessagesChange: (filteredMessages: string[]) => void
  onFilteredIndexChange: (filteredIndex: number) => void
  isCloseSearch: () => void
  allMessages: MessageInterface[]
  setLimit: Dispatch<SetStateAction<number>>
}

const SearchByMessage: FC<SearchByMessageProps> = ({
  onFilteredMessagesChange,
  onFilteredIndexChange,
  isCloseSearch,
  allMessages,
  setLimit
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
      const possibleMessage: number[] = []
      const filtered = allMessages.filter((message, index) => {
        const isMatch = message.text
          .toLowerCase()
          .includes(search.toLowerCase())

        if (isMatch) {
          possibleMessage.push(index)
        }
        const maxNumber = Math.max(...possibleMessage)
        setLimit(maxNumber + 1)

        return isMatch
      })

      const filteredMessages = filtered.map((item) => item.text)

      debouncedOnFilteredMessagesChange(filteredMessages)
      setFindMessage(filteredMessages)
    } else {
      onFilteredMessagesChange([])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, allMessages])

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
        inputProps={{ maxLength: 30 }}
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

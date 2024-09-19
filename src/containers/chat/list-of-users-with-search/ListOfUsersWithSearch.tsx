import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleBar from 'simplebar-react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import ChatItem from '~/containers/chat/chat-item/ChatItem'
import FilterInput from '~/components/filter-input/FilterInput'
import { useAppSelector } from '~/hooks/use-redux'

import { ChatResponse, SizeEnum } from '~/types'
import { styles } from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch.styles'
import { filterChats } from './ListOfUsersWithSearch.constants'

interface ListOfUsersWithSearchProps {
  listOfChats: ChatResponse[]
  selectedChat: ChatResponse | null
  setSelectedChat: (chat: ChatResponse) => void
  closeDrawer?: () => void
}

const ListOfUsersWithSearch: FC<ListOfUsersWithSearchProps> = ({
  listOfChats,
  selectedChat,
  setSelectedChat,
  closeDrawer
}) => {
  const [search, setSearch] = useState<string>('')

  const { userId } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()

  const filteredChats = filterChats(listOfChats, userId, search)

  const chats = filteredChats.map((item: ChatResponse) => {
    const isActiveChat = selectedChat?._id === item._id
    return (
      <ChatItem
        chat={item}
        closeDrawer={closeDrawer}
        isActiveChat={isActiveChat}
        key={item._id}
        setSelectedChat={setSelectedChat}
      />
    )
  })

  return (
    <Box sx={styles.root}>
      <Box sx={styles.search}>
        <FilterInput
          fullWidth
          label={t('common.search')}
          onChange={setSearch}
          size={SizeEnum.Medium}
          value={search}
        />
      </Box>

      <Divider sx={styles.divider} />

      {chats.length > 0 ? (
        <SimpleBar style={styles.scroll}>{chats}</SimpleBar>
      ) : (
        <Typography sx={styles.information}>
          {t('chatPage.noContacts')}
        </Typography>
      )}
    </Box>
  )
}

export default ListOfUsersWithSearch

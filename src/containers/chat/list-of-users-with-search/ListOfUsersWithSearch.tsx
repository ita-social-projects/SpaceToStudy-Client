import { FC, useMemo, useState } from 'react'
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
  isSelectedChat: string
  setIsSelectedChat: (id: string) => void
  closeDrawer?: () => void
}

const ListOfUsersWithSearch: FC<ListOfUsersWithSearchProps> = ({
  listOfChats,
  isSelectedChat,
  setIsSelectedChat,
  closeDrawer
}) => {
  const [search, setSearch] = useState<string>('')

  const { userId } = useAppSelector((state) => state.appMain)

  const { t } = useTranslation()

  const chats = useMemo(() => {
    const filteredChats = filterChats(listOfChats, userId, search)
    return filteredChats.map((item: ChatResponse) => (
      <ChatItem
        closeDrawer={closeDrawer}
        isSelectedChat={isSelectedChat}
        key={item._id}
        lastMessage={item.latestMessage}
        setIsSelectedChat={setIsSelectedChat}
        user={item.members[0].user}
      />
    ))
  }, [
    closeDrawer,
    isSelectedChat,
    listOfChats,
    search,
    setIsSelectedChat,
    userId
  ])

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
        <Typography sx={styles.information}>{t('chat.noContacts')}</Typography>
      )}
    </Box>
  )
}

export default ListOfUsersWithSearch

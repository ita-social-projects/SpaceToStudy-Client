import { FC, useCallback, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import ChatItem from '~/containers/chat/chat-item/ChatItem'
import FilterInput from '~/components/filter-input/FilterInput'
import CustomScrollBar from '~/components/custom-scroll-bar/CustomScrollBar'

import { styles } from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch.styles'
import { ChatResponse, SizeEnum } from '~/types'

interface ListOfUsersWithSearchProps {
  listOfChats: ChatResponse[]
  listOfFoundedMessages: ChatResponse[]
  isSelectedChat: string
  setIsSelectedChat: (id: string) => void
  search: string
  setSearch: (chatOrMessage: string) => void
}

const ListOfUsersWithSearch: FC<ListOfUsersWithSearchProps> = ({
  search,
  setSearch,
  listOfChats,
  listOfFoundedMessages,
  isSelectedChat,
  setIsSelectedChat
}) => {
  const { t } = useTranslation()

  const closeChat = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSelectedChat('')
      }
    },
    [setIsSelectedChat]
  )

  useEffect(() => {
    document.addEventListener('keydown', closeChat)

    return () => {
      document.removeEventListener('keydown', closeChat)
    }
  }, [closeChat])

  const chats = useMemo(
    () =>
      listOfChats
        .filter((item) => {
          const { firstName, lastName } = item.members[0]
          const fullName = `${firstName} ${lastName}`

          return fullName
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        })
        .map((item) => (
          <ChatItem
            isSelectedChat={isSelectedChat}
            key={item._id}
            lastMessage={item.latestMessage}
            setIsSelectedChat={setIsSelectedChat}
            user={item.members[0]}
          />
        )),
    [isSelectedChat, listOfChats, search, setIsSelectedChat]
  )

  const foundedMessages = useMemo(
    () =>
      listOfFoundedMessages.map((item) => (
        <ChatItem
          isSelectedChat={isSelectedChat}
          key={item._id}
          lastMessage={item.latestMessage}
          setIsSelectedChat={setIsSelectedChat}
          user={item.members[0]}
        />
      )),
    [isSelectedChat, listOfFoundedMessages, setIsSelectedChat]
  )

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

      <CustomScrollBar height='calc(100% - 120px)'>
        {chats.length === 0 && listOfFoundedMessages.length === 0 && (
          <Typography sx={styles.information}>
            {t('chatPage.noContactsOrMessages')}
          </Typography>
        )}

        {chats.length > 0 ? (
          chats
        ) : (
          <Typography sx={styles.information}>
            {t('chatPage.noContactsOrMessages')}
          </Typography>
        )}

        {foundedMessages.length > 0 ? (
          <>
            <Typography sx={styles.information}>
              {t('chatPage.foundedMessages', {
                count: foundedMessages.length
              })}
            </Typography>
            {foundedMessages}
          </>
        ) : (
          <Typography sx={styles.information}>
            {t('chatPage.notFoundedMessages', {
              count: foundedMessages.length
            })}
          </Typography>
        )}
      </CustomScrollBar>
    </Box>
  )
}

export default ListOfUsersWithSearch

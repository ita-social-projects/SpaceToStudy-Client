import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import SplitView from '~/components/split-view/SplitView'
import useBreakpoints from '~/hooks/use-breakpoints'
import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import { useDrawer } from '~/hooks/use-drawer'

import { PositionEnum } from '~/types'

import {
  messages,
  usersMock
} from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch.constants'

const Chat = () => {
  const [isSelectedChat, setIsSelectedChat] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const openChatsHendler = () => {
    openDrawer()
  }

  return (
    <PageWrapper>
      {isMobile && (
        <AppDrawer
          anchor={PositionEnum.Left}
          onClose={closeDrawer}
          open={isOpen}
        >
          <ListOfUsersWithSearch
            isSelectedChat={isSelectedChat}
            listOfChats={usersMock}
            listOfFoundedMessages={messages}
            search={search}
            setIsSelectedChat={setIsSelectedChat}
            setSearch={setSearch}
          />
        </AppDrawer>
      )}
      <SplitView
        isHideLeft={isMobile}
        left={
          <ListOfUsersWithSearch
            isSelectedChat={isSelectedChat}
            listOfChats={usersMock}
            listOfFoundedMessages={messages}
            search={search}
            setIsSelectedChat={setIsSelectedChat}
            setSearch={setSearch}
          />
        }
        right={
          <>
            {isMobile && (
              <IconButton onClick={openChatsHendler}>
                <MenuIcon />
              </IconButton>
            )}
            <h1>It`s real chat, baby</h1>
          </>
        }
      />
    </PageWrapper>
  )
}

export default Chat

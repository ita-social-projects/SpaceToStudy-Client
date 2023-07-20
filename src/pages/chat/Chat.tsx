import { useState, useCallback } from 'react'
import { Allotment } from 'allotment'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import useBreakpoints from '~/hooks/use-breakpoints'
import ListOfUsersWithSearch from '~/containers/chat/list-of-users-with-search/ListOfUsersWithSearch'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import { useDrawer } from '~/hooks/use-drawer'
import { chatService } from '~/services/chat-service'
import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'

import { PositionEnum } from '~/types'
import { styles } from '~/pages/chat/Chat.styles'
import { defaultResponses } from '~/constants'

const Chat = () => {
  const [isSelectedChat, setIsSelectedChat] = useState<string>('')
  const breakpoints = useBreakpoints()
  const { isMobile } = breakpoints
  const { openDrawer, closeDrawer, isOpen } = useDrawer()

  const openChatsHendler = () => {
    openDrawer()
  }

  const getChats = useCallback(() => chatService.getChats(), [])
  const { response: listOfChats, loading } = useAxios({
    service: getChats,
    defaultResponse: defaultResponses.array
  })

  if (loading) {
    return <Loader size={100} />
  }

  return (
    <PageWrapper sx={styles.root}>
      {isMobile && (
        <AppDrawer
          anchor={PositionEnum.Left}
          onClose={closeDrawer}
          open={isOpen}
        >
          <ListOfUsersWithSearch
            closeDrawer={closeDrawer}
            isSelectedChat={isSelectedChat}
            listOfChats={listOfChats}
            setIsSelectedChat={setIsSelectedChat}
          />
        </AppDrawer>
      )}
      <Allotment defaultSizes={isMobile ? [1] : [25, 75]}>
        {!isMobile && (
          <Allotment.Pane minSize={250} preferredSize={350}>
            <ListOfUsersWithSearch
              isSelectedChat={isSelectedChat}
              listOfChats={listOfChats}
              setIsSelectedChat={setIsSelectedChat}
            />
          </Allotment.Pane>
        )}
        <Allotment.Pane minSize={350}>
          <>
            {isMobile && (
              <IconButton onClick={openChatsHendler}>
                <MenuIcon />
              </IconButton>
            )}
            <h1>It`s real chat</h1>
          </>
        </Allotment.Pane>
      </Allotment>
    </PageWrapper>
  )
}

export default Chat

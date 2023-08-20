import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { ChatInfo } from '~/types'

interface ChatProviderProps {
  children: ReactNode
}

interface ChatProvideContext {
  chatInfo: ChatInfo | null
  setChatInfo: (chatInfo: ChatInfo | null) => void
}

const ChatContext = createContext<ChatProvideContext>({} as ChatProvideContext)

const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)

  const contextValue = useMemo(
    () => ({ chatInfo, setChatInfo }),
    [chatInfo, setChatInfo]
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

const useChatContext = () => useContext(ChatContext)

export { ChatProvider, useChatContext }

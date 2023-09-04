import { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { ChatInfo } from '~/types'

interface ChatProviderProps {
  children: ReactNode
}

interface ChatProvideContext {
  chatInfo: ChatInfo | null
  currentChatId: string | null
  setChatInfo: (chatInfo: ChatInfo | null) => void
  setCurrentChatId: (currentChatId: string | null) => void
}

const ChatContext = createContext<ChatProvideContext>({} as ChatProvideContext)

const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const contextValue = useMemo(
    () => ({ chatInfo, setChatInfo, currentChatId, setCurrentChatId }),
    [chatInfo, setChatInfo, currentChatId, setCurrentChatId]
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}

const useChatContext = () => useContext(ChatContext)

export { ChatProvider, useChatContext }

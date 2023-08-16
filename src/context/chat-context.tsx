import { createContext, useContext, useState, useMemo } from 'react'
import { Offer } from '~/types'

interface ChatProviderProps {
  children: React.ReactNode
}

interface ChatProvideContext {
  chatInfo: Pick<Offer, 'author' | 'authorRole' | 'chatId'> | null
  setChatInfo: (
    chatInfo: Pick<Offer, 'author' | 'authorRole' | 'chatId'> | null
  ) => void
}

const ChatContext = createContext<ChatProvideContext>({} as ChatProvideContext)

const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatInfo, setChatInfo] = useState<Pick<
    Offer,
    'author' | 'authorRole' | 'chatId'
  > | null>(null)

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

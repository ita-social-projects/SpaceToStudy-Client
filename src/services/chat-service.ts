import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { BasicChat, ChatResponse } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const chatService = {
  getChats: (): Promise<AxiosResponse<ChatResponse[]>> => {
    return axiosClient.get(URLs.chats.get)
  },
  createChat: (
    chatData: BasicChat
  ): Promise<AxiosResponse<ChatResponse | undefined>> => {
    return axiosClient.post(URLs.chats.create, chatData)
  },
  deleteChat: async (chatId: string): Promise<AxiosResponse<void>> => {
    return axiosClient.delete(createUrlPath(URLs.chats.delete, chatId))
  },
  markChatAsDeleted: async (
    chatId: string
  ): Promise<AxiosResponse<ChatResponse>> => {
    return axiosClient.patch(createUrlPath(URLs.chats.patch, chatId))
  }
}

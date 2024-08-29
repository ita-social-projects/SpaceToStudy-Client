import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  GetMessagesParams,
  SendMessageParams,
  GetMessagesResponse
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const messageService = {
  getMessages: (
    params?: GetMessagesParams
  ): Promise<AxiosResponse<GetMessagesResponse>> => {
    const chat = createUrlPath(URLs.chats.get, params?.chatId)
    return axiosClient.get(`${chat}${URLs.messages.get}`, { params })
  },
  sendMessage: (params: SendMessageParams): Promise<AxiosResponse> => {
    const chat = createUrlPath(URLs.chats.get, params.chatId)
    return axiosClient.post(`${chat}${URLs.messages.post}`, params)
  },
  deleteMessagesFromChat: async (
    chatId: string
  ): Promise<AxiosResponse<void>> => {
    const chat = createUrlPath(URLs.chats.delete, chatId)
    return axiosClient.delete(`${chat}${URLs.messages.delete}`)
  },
  clearChatHistory: async (chatId: string): Promise<AxiosResponse> => {
    const chat = createUrlPath(URLs.chats.patch, chatId)
    return axiosClient.patch(`${chat}${URLs.messages.patch}`)
  }
}

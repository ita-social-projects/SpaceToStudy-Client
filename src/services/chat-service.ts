import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { BasicChat, ChatResponse } from '~/types'

export const chatService = {
  getChats: (): Promise<AxiosResponse<ChatResponse[]>> => {
    return axiosClient.get(URLs.chats.get)
  },
  createChat: (
    chatData: BasicChat
  ): Promise<AxiosResponse<ChatResponse | undefined>> => {
    return axiosClient.post(URLs.chats.create, chatData)
  }
}
